import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactPayload {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  village?: string;
  lead_type?: string;
  interest_tag?: string;
  property_type?: string;
  budget?: string;
  timeline?: string;
  features?: string;
  notes?: string;
  listing_purpose?: string;
  property_size?: string;
  property_address?: string;
  has_etv_licence?: string;
  lead_source?: string;
  form_step?: string;
}

const HUBSPOT_API_KEY = Deno.env.get("HUBSPOT_API_KEY") || "";

async function findContactByEmail(
  email: string
): Promise<{ id: string } | null> {
  try {
    const resp = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      return { id: data.id };
    }
    return null;
  } catch {
    return null;
  }
}

async function createContact(
  properties: Record<string, string>
): Promise<{ id: string } | null> {
  const resp = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HUBSPOT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });

  if (resp.ok) {
    const data = await resp.json();
    return { id: data.id };
  }

  const errorBody = await resp.text();
  throw new Error(`Create failed: ${resp.status} ${errorBody}`);
}

async function updateContact(
  contactId: string,
  properties: Record<string, string>
): Promise<void> {
  const resp = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ properties }),
    }
  );

  if (!resp.ok) {
    const errorBody = await resp.text();
    throw new Error(`Update failed: ${resp.status} ${errorBody}`);
  }
}

async function addContactToList(
  contactId: string,
  listId: string
): Promise<void> {
  try {
    await fetch(
      `https://api.hubapi.com/crm/v3/lists/${listId}/memberships/add`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([contactId]),
      }
    );
  } catch {
    // list add is best-effort
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (!HUBSPOT_API_KEY) {
      return new Response(
        JSON.stringify({ error: "HubSpot API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const payload: ContactPayload = await req.json();

    if (!payload.email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const properties: Record<string, string> = {};

    if (payload.email) properties.email = payload.email;
    if (payload.firstname) properties.firstname = payload.firstname;
    if (payload.lastname) properties.lastname = payload.lastname;
    if (payload.phone) properties.phone = payload.phone;
    if (payload.village) properties.calvia_village = payload.village;
    if (payload.lead_type) properties.calvia_lead_type = payload.lead_type;
    if (payload.interest_tag) properties.calvia_interest = payload.interest_tag;
    if (payload.property_type)
      properties.calvia_property_type = payload.property_type;
    if (payload.budget) properties.calvia_budget = payload.budget;
    if (payload.timeline) properties.calvia_timeline = payload.timeline;
    if (payload.features) properties.calvia_features = payload.features;
    if (payload.notes) properties.calvia_notes = payload.notes;
    if (payload.listing_purpose)
      properties.calvia_listing_purpose = payload.listing_purpose;
    if (payload.property_size)
      properties.calvia_property_size = payload.property_size;
    if (payload.property_address)
      properties.calvia_property_address = payload.property_address;
    if (payload.has_etv_licence)
      properties.calvia_etv_licence = payload.has_etv_licence;
    if (payload.lead_source) properties.calvia_lead_source = payload.lead_source;
    if (payload.form_step) properties.calvia_form_step = payload.form_step;

    let contactId: string;
    const existing = await findContactByEmail(payload.email);

    if (existing) {
      await updateContact(existing.id, properties);
      contactId = existing.id;
    } else {
      const created = await createContact(properties);
      if (!created) {
        return new Response(
          JSON.stringify({ error: "Failed to create contact" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      contactId = created.id;
    }

    const listId = Deno.env.get("HUBSPOT_LIST_ID");
    if (listId) {
      await addContactToList(contactId, listId);
    }

    return new Response(
      JSON.stringify({ success: true, contactId }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
