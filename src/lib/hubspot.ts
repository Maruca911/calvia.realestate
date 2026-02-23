const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

interface HubSpotContactData {
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

async function sendToHubSpot(data: HubSpotContactData): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !data.email) return false;

  try {
    const resp = await fetch(
      `${SUPABASE_URL}/functions/v1/hubspot-contact`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return resp.ok;
  } catch {
    return false;
  }
}

function splitName(name: string): { firstname: string; lastname: string } {
  const parts = name.trim().split(/\s+/);
  return {
    firstname: parts[0] || '',
    lastname: parts.slice(1).join(' ') || '',
  };
}

function deriveInterestTag(type: 'buyer' | 'seller', intent: string): string {
  if (type === 'buyer') {
    if (intent === 'Buy') return 'wants to buy';
    if (intent === 'Long-term Rental') return 'interested in renting';
    if (intent === 'Short-term Rental') return 'interested in renting';
    return '';
  }
  if (intent === 'Sale') return 'wants to sell';
  if (intent === 'Long-term Rental') return 'wants to rent out';
  if (intent === 'Short-term Rental') return 'wants to rent out';
  return '';
}

export async function submitBuyerStepToHubSpot(
  stepIndex: number,
  data: Record<string, unknown>
): Promise<boolean> {
  const email = data.email as string || '';
  if (!email) return false;

  const { firstname, lastname } = splitName(data.name as string || '');
  const intent = data.intent as string || '';

  const payload: HubSpotContactData = {
    email,
    firstname,
    lastname,
    phone: data.phone as string || '',
    village: data.village as string || '',
    lead_type: 'Home Seeker',
    interest_tag: deriveInterestTag('buyer', intent),
    lead_source: 'calvia_realestate_buyer_form',
    form_step: `buyer_step_${stepIndex + 1}`,
  };

  if (stepIndex >= 1) {
    const propertyType = data.propertyType as string[] || [];
    payload.property_type = propertyType.join(', ');
    payload.timeline = data.timeline as string || '';
    const isBuy = intent === 'Buy';
    payload.budget = String(isBuy ? data.budget : data.monthlyBudget);
    const features = data.features as string[] || [];
    payload.features = features.join(', ');
  }

  if (stepIndex >= 2) {
    payload.notes = data.notes as string || '';
  }

  return sendToHubSpot(payload);
}

export async function submitSellerStepToHubSpot(
  stepIndex: number,
  data: Record<string, unknown>
): Promise<boolean> {
  const email = data.email as string || '';
  if (!email) return false;

  const { firstname, lastname } = splitName(data.name as string || '');
  const purpose = data.listingPurpose as string || '';

  const payload: HubSpotContactData = {
    email,
    firstname,
    lastname,
    phone: data.phone as string || '',
    village: data.village as string || '',
    lead_type: 'Home Owner',
    interest_tag: deriveInterestTag('seller', purpose),
    lead_source: 'calvia_realestate_seller_form',
    form_step: `seller_step_${stepIndex + 1}`,
    listing_purpose: purpose,
    property_address: data.address as string || '',
  };

  if (stepIndex >= 1) {
    const propertyType = data.propertyType as string[] || [];
    payload.property_type = propertyType.join(', ');
    payload.property_size = data.size as string || '';
    const features = data.features as string[] || [];
    payload.features = features.join(', ');

    const isSale = purpose === 'Sale';
    const isLongTerm = purpose === 'Long-term Rental';
    if (isSale) payload.budget = String(data.askingPrice);
    else if (isLongTerm) payload.budget = String(data.monthlyRent);
    else payload.budget = String(data.nightlyRate);

    const hasEtv = data.hasEtvLicence as string[] || [];
    payload.has_etv_licence = hasEtv.length > 0 ? 'Yes' : 'No';
  }

  if (stepIndex >= 2) {
    payload.timeline = data.timeline as string || '';
    payload.notes = data.notes as string || '';
  }

  return sendToHubSpot(payload);
}
