const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID || '';
const HUBSPOT_BUYER_FORM_GUID = import.meta.env.VITE_HUBSPOT_BUYER_FORM_GUID || '';
const HUBSPOT_SELLER_FORM_GUID = import.meta.env.VITE_HUBSPOT_SELLER_FORM_GUID || '';

interface HubSpotField {
  name: string;
  value: string;
}

interface HubSpotSubmission {
  portalId: string;
  formGuid: string;
  fields: HubSpotField[];
  context: {
    pageUri: string;
    pageName: string;
  };
  legalConsentOptions?: {
    consent: {
      consentToProcess: boolean;
      text: string;
    };
  };
}

async function submitToHubSpotAPI(payload: HubSpotSubmission): Promise<boolean> {
  if (!payload.portalId || !payload.formGuid) return false;

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v1/integration/submit/${payload.portalId}/${payload.formGuid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}

export async function submitBuyerToHubSpot(data: Record<string, string>): Promise<boolean> {
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_BUYER_FORM_GUID) return false;

  const fields: HubSpotField[] = [
    { name: 'firstname', value: data.name?.split(' ')[0] || '' },
    { name: 'lastname', value: data.name?.split(' ').slice(1).join(' ') || '' },
    { name: 'email', value: data.email || '' },
    { name: 'phone', value: data.phone || '' },
    { name: 'property_type', value: data.propertyType || '' },
    { name: 'village_preference', value: data.village || '' },
    { name: 'buyer_intent', value: data.intent || '' },
    { name: 'budget', value: data.budget || '' },
    { name: 'timeline', value: data.timeline || '' },
    { name: 'features', value: data.features || '' },
    { name: 'notes', value: data.notes || '' },
    { name: 'lead_source', value: 'calvia_realestate_buyer_form' },
  ].filter((f) => f.value);

  return submitToHubSpotAPI({
    portalId: HUBSPOT_PORTAL_ID,
    formGuid: HUBSPOT_BUYER_FORM_GUID,
    fields,
    context: {
      pageUri: window.location.href,
      pageName: 'Buyer Lead Form',
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: 'I agree to allow Calvia Real Estate to store and process my personal data for property matching purposes.',
      },
    },
  });
}

export async function submitSellerToHubSpot(data: Record<string, string>): Promise<boolean> {
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_SELLER_FORM_GUID) return false;

  const fields: HubSpotField[] = [
    { name: 'firstname', value: data.name?.split(' ')[0] || '' },
    { name: 'lastname', value: data.name?.split(' ').slice(1).join(' ') || '' },
    { name: 'email', value: data.email || '' },
    { name: 'phone', value: data.phone || '' },
    { name: 'property_type', value: data.propertyType || '' },
    { name: 'village', value: data.village || '' },
    { name: 'listing_purpose', value: data.purpose || '' },
    { name: 'asking_price', value: data.price || '' },
    { name: 'timeline', value: data.timeline || '' },
    { name: 'features', value: data.features || '' },
    { name: 'notes', value: data.notes || '' },
    { name: 'lead_source', value: 'calvia_realestate_seller_form' },
  ].filter((f) => f.value);

  return submitToHubSpotAPI({
    portalId: HUBSPOT_PORTAL_ID,
    formGuid: HUBSPOT_SELLER_FORM_GUID,
    fields,
    context: {
      pageUri: window.location.href,
      pageName: 'Seller Lead Form',
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: 'I agree to allow Calvia Real Estate to store and process my personal data for property matching purposes.',
      },
    },
  });
}
