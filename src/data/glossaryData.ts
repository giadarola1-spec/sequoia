export type NotionColor = 'yellow' | 'blue' | 'green' | 'orange' | 'purple' | 'gray' | 'pink';

export interface CategoryInfo {
  id: string;
  name: string;
  shortName: string;
  color: NotionColor;
  icon: string;
  description: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  letter: string;
  page: number;
  category: string;
  icon: string;
  calloutEs: string;
  definitionEn: string;
  explanationEs: string;
  details: string[];
  relatedTerms?: string[];
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  operations: {
    id: 'operations',
    name: 'Operations, Freight & Supply Chain',
    shortName: 'Operations & Freight',
    color: 'gray',
    icon: '',
    description: 'Shipping modes (FTL, LTL), warehouse handling, routing, consolidation, and units of measurement.'
  },
  equipment: {
    id: 'equipment',
    name: 'Equipment, Trucks & Trailers',
    shortName: 'Equipment & Trailers',
    color: 'blue',
    icon: '',
    description: 'Trailer types (Dry Van, Reefer, Flatbed, Lowboy, Conestoga), trucks, and securement devices.'
  },
  roles: {
    id: 'roles',
    name: 'Industry Roles & Entities',
    shortName: 'Roles & Entities',
    color: 'green',
    icon: '',
    description: 'Industry participants: Shippers, Carriers, Freight Brokers, Dispatchers, Drivers, and 3PLs.'
  },
  finance: {
    id: 'finance',
    name: 'Payments, Finance & Rates',
    shortName: 'Payments & Rates',
    color: 'yellow',
    icon: '',
    description: 'Payment methods (ACH, Comcheck, Quick Pay, Wire), pricing (Spot Rate, Tariff), Factoring, and fees.'
  },
  documents: {
    id: 'documents',
    name: 'Documents, Packages & Contracts',
    shortName: 'Documents & Contracts',
    color: 'orange',
    icon: '',
    description: 'Legal and operational paperwork: BOL, POD, Rate Confirmation, Carrier/Shipper Package, Invoice, and W9.'
  },
  regulation: {
    id: 'regulation',
    name: 'Insurance, Regulation & Compliance',
    shortName: 'Regulation & Insurance',
    color: 'purple',
    icon: '',
    description: 'Federal regulations (FMCSA, HOS, ELD, DOT, MC, Overweight, Freight Class) and insurance policies.'
  },
  technology: {
    id: 'technology',
    name: 'Technology, Systems & Platforms',
    shortName: 'Technology & Software',
    color: 'pink',
    icon: '',
    description: 'Logistics management software (TMS, CRM, Hubspot, ITS Dispatch), Load Boards (Truckstop), and Tracking.'
  }
};

export const PDF_INDEX_PAGES: { letter: string; pdfPage: number }[] = [
  { letter: 'A', pdfPage: 3 },
  { letter: 'B', pdfPage: 3 },
  { letter: 'C', pdfPage: 4 },
  { letter: 'D', pdfPage: 8 },
  { letter: 'E', pdfPage: 9 },
  { letter: 'F', pdfPage: 11 },
  { letter: 'G', pdfPage: 13 },
  { letter: 'H', pdfPage: 14 },
  { letter: 'I', pdfPage: 15 },
  { letter: 'J', pdfPage: 15 },
  { letter: 'K', pdfPage: 15 },
  { letter: 'L', pdfPage: 15 },
  { letter: 'M', pdfPage: 18 },
  { letter: 'N', pdfPage: 18 },
  { letter: 'O', pdfPage: 18 },
  { letter: 'P', pdfPage: 19 },
  { letter: 'Q', pdfPage: 20 },
  { letter: 'R', pdfPage: 20 },
  { letter: 'S', pdfPage: 21 },
  { letter: 'T', pdfPage: 22 },
  { letter: 'U', pdfPage: 24 },
  { letter: 'V', pdfPage: 25 },
  { letter: 'W', pdfPage: 25 },
  { letter: 'X', pdfPage: 25 },
  { letter: 'Y', pdfPage: 25 },
  { letter: 'Z', pdfPage: 25 },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ================= A =================
  {
    id: 'ach',
    term: 'ACH',
    acronym: 'ACH',
    letter: 'A',
    page: 2,
    category: 'finance',
    icon: '',
    calloutEs: 'Electronic money transfer between banks regulated by NACHA that allows funds to be pulled from or pushed online to accounts at other banks.',
    definitionEn: "An electronic money transfer between banks that allows money to be pulled from an account or to be 'pushed' online to accounts at other banks. An ACH transfer is one of the main ways to send or receive money online. Financial institutions can choose to have ACH credits processed and delivered either within a business day or in one to two days. In contrast, ACH debit transactions must be processed by the next business day. These timelines are based on rules from the National Automated Clearing House Association, the trade group that oversees the network.",
    explanationEs: 'Es una de las formas principales de enviar o recibir dinero en línea entre cuentas bancarias. Las instituciones financieras pueden procesar créditos ACH en el mismo día hábil o entre 1 y 2 días, mientras que los débitos ACH deben procesarse al siguiente día hábil.',
    details: [
      'ACH Credits: Processed and delivered either within a single business day or in 1 to 2 business days.',
      'ACH Debits: Must be processed by the next business day.',
      'Governing Body: Regulated by the National Automated Clearing House Association (NACHA), the trade group that oversees the network.'
    ],
    relatedTerms: ['Wire Transfer', 'Comcheck', 'Quick pay']
  },
  {
    id: 'appointment',
    term: 'Appointment',
    letter: 'A',
    page: 3,
    category: 'operations',
    icon: '',
    calloutEs: 'Formal arrangement between the shipper and the carrier for goods to arrive at a selected destination at a specific scheduled time.',
    definitionEn: 'A formal arrangement between the shipper and the carrier for the goods to arrive at the selected destination at a particular time.',
    explanationEs: 'Cita programada formalmente entre el remitente/embarcador y el transportista para la recepción o entrega puntual de la carga en el destino acordado.',
    details: [
      'Contrasts with FCFS (First Come, First Serve), where trucks are loaded or unloaded in order of arrival.',
      'Missing a scheduled appointment window may result in Reschedule, Layover, or Detention charges.'
    ],
    relatedTerms: ['First Come, First Serve (FCFS)', 'Reschedule', 'Detention']
  },
  {
    id: 'asset-based-carrier',
    term: 'Asset Based Carrier',
    letter: 'A',
    page: 3,
    category: 'roles',
    icon: '',
    calloutEs: 'Transportation company that directly owns and operates its own physical fleet of trucks.',
    definitionEn: 'A company who has their own trucks.',
    explanationEs: 'Transportista basado en activos propios; es decir, una compañía que posee físicamente su propia flota de camiones para mover la carga, a diferencia de un intermediario sin flota.',
    details: [
      'Owns physical transportation assets (tractors, trailers) and employs or contracts drivers directly.',
      'Provides direct operational control over fleet capacity and freight execution.'
    ],
    relatedTerms: ['Carrier', 'Common Carrier', 'Contract carrier', 'Owner Operator']
  },
  {
    id: 'auto-hauler',
    term: 'Auto Hauler',
    letter: 'A',
    page: 3,
    category: 'equipment',
    icon: '',
    calloutEs: 'Open or enclosed trailer or semi-trailer equipped with built-in ramps and power hydraulics to efficiently transport passenger vehicles.',
    definitionEn: 'A type of trailer or semi-trailer designed to efficiently transport passenger vehicles via truck. Modern auto haulers can be open or enclosed. Most commercial trailers have built-in ramps for loading and off-loading cars, as well as power hydraulics to raise and lower ramps for stand-alone accessibility.',
    explanationEs: 'Tipo de remolque o semirremolque especializado en el transporte eficiente de vehículos de pasajeros por camión. Pueden ser abiertos o cerrados y cuentan con rampas integradas e hidráulicos de potencia.',
    details: [
      'Configurations: Available as open or enclosed trailers.',
      'Built-in Ramps: Equipped with integrated ramps for loading and off-loading passenger vehicles.',
      'Power Hydraulics: Uses hydraulic systems to raise and lower decks and ramps for stand-alone accessibility.'
    ],
    relatedTerms: ['Trailer', 'Truck', 'Dropdeck Trailer']
  },
  {
    id: 'automobile-liability-insurance',
    term: 'Automobile Liability Insurance',
    letter: 'A',
    page: 3,
    category: 'regulation',
    icon: '',
    calloutEs: 'Insurance protecting the insured against financial loss from legal liability for automobile-related injuries to others or damage to their property.',
    definitionEn: 'Insurance that protects the insured against financial loss because of legal liability for automobile-related injuries to others or damage to their property by an auto.',
    explanationEs: 'Póliza de seguro de responsabilidad civil automotriz que cubre al asegurado frente a reclamos legales por lesiones corporales a terceros o daños materiales ocasionados por la operación de un vehículo.',
    details: [
      'Covers bodily injuries to others and damage to third-party property caused by an insured vehicle.',
      'Distinct from Cargo Insurance, which specifically covers physical loss or damage to the freight being hauled.'
    ],
    relatedTerms: ['Liability Insurance', 'Cargo Insurance', 'Insurance', 'Certificate Holder']
  },

  // ================= B =================
  {
    id: 'backhaul',
    term: 'Backhaul',
    letter: 'B',
    page: 3,
    category: 'operations',
    icon: '',
    calloutEs: 'Freight movement in a direction or lane of secondary importance or light demand (return trip).',
    definitionEn: 'A freight movement in a direction (or lane) of secondary importance or light demand.',
    explanationEs: 'Viaje de retorno o movimiento de carga en un corredor (lane) de menor demanda comercial, utilizado para evitar que el camión regrese vacío tras completar su ruta principal (headhaul).',
    details: [
      'Occurs in lanes of secondary importance or lower freight demand.',
      'Typically priced at lower rates to help carriers cover fuel and operating costs on return trips.'
    ],
    relatedTerms: ['Lane', 'Rate', 'Spot Rate']
  },
  {
    id: 'bidding',
    term: 'Bidding',
    letter: 'B',
    page: 3,
    category: 'finance',
    icon: '',
    calloutEs: 'Competitive offer placed through load boards to set a price tag for a load and determine the most profitable option.',
    definitionEn: 'An offer (often competitive) to set a price tag by an individual or business for a load through load bards to find the most profitable for your company. Bidding is used to determine the cost or value of something.',
    explanationEs: 'Proceso de licitación o puja competitiva mediante el cual una persona o empresa propone un precio para transportar una carga a través de Load Boards, determinando el costo o valor del servicio.',
    details: [
      'Frequently conducted via online Load Boards to match available freight with carriers.',
      'Used to establish the market cost or value of moving a specific load.'
    ],
    relatedTerms: ['Load Board', 'Tender', 'Rate', 'Spot Rate']
  },
  {
    id: 'billing-address',
    term: 'Billing Address',
    letter: 'B',
    page: 3,
    category: 'finance',
    icon: '',
    calloutEs: 'Address connected to a specific form of payment (credit or debit card) used to verify authorized card use and mail statements.',
    definitionEn: 'The address connected to a specific form of payment, which is typically a credit or debit card. Companies use the billing address to verify the authorized use of such a card. It is also where companies send paper bills and bank statement.',
    explanationEs: 'Dirección postal asociada al método de pago (usualmente tarjeta de crédito o débito). Las empresas la utilizan como medida de verificación de seguridad y como destino para facturas impresas y estados bancarios.',
    details: [
      'Verification: Used by companies to verify the authorized use of a credit or debit card.',
      'Correspondence: Destination where paper bills and bank statements are mailed.'
    ],
    relatedTerms: ['Invoice', 'Commercial Invoice']
  },

  // ================= C =================
  {
    id: 'cargo-insurance',
    term: 'Cargo Insurance',
    letter: 'C',
    page: 4,
    category: 'regulation',
    icon: '',
    calloutEs: 'Coverage against all risks of physical loss or damage to freight from any external cause during transit by land, sea, or air.',
    definitionEn: 'Provides coverage against all risks of physical loss or damage to freight during the shipment from any external cause during shipping, whether by land, sea or air. Because of the many dangers inherent in shipping, most individuals and businesses choose to insure their goods while they are in transit.',
    explanationEs: 'Cobertura de seguro sobre la carga que protege contra pérdidas físicas o daños materiales sufridos por la mercancía durante su transporte por tierra, mar o aire debido a causas externas.',
    details: [
      'Covers multimodal shipments across land, sea, or air.',
      'Protects freight against physical loss or damage from external causes while in transit.'
    ],
    relatedTerms: ['Insurance', 'Liability Insurance', 'Automobile Liability Insurance', 'Claim']
  },
  {
    id: 'carrier',
    term: 'Carrier',
    letter: 'C',
    page: 4,
    category: 'roles',
    icon: '',
    calloutEs: 'Company or person legally entitled to transport goods from one place to another by land, water, or air.',
    definitionEn: 'A company or a person legally entitled to transport goods by land, water, and air. Carrier ship goods from one place to the other.',
    explanationEs: 'Transportista (persona física o empresa) con autorización legal para trasladar bienes de un punto a otro por vía terrestre, acuática o aérea.',
    details: [
      'Can operate as a Common Carrier (open to the public) or a Contract Carrier (long-term agreement).',
      'Requires formal registration via a Carrier Package, USDOT Number, and MC Number for interstate commerce.'
    ],
    relatedTerms: ['Common Carrier', 'Contract carrier', 'Asset Based Carrier', 'Carrier Package']
  },
  {
    id: 'common-carrier',
    term: 'Common Carrier',
    letter: 'C',
    page: 4,
    category: 'roles',
    icon: '',
    calloutEs: 'Licensed transport provider that offers its services to any person or company without being bound by an exclusive contract.',
    definitionEn: 'Refers to the transport provider that offers his services to any person or company, as he is entitled to do so under the license provided by a regulatory body. The common carrier is able to work with more shippers within the same day because he is not bound by any contract.',
    explanationEs: 'Transportista público o general que ofrece sus servicios al público en general bajo licencia de un organismo regulador. Puede trabajar con múltiples embarcadores (shippers) en un mismo día al no estar limitado por un contrato de exclusividad.',
    details: [
      'Operates under a license granted by a regulatory authority (such as the FMCSA).',
      'Flexibility: Able to serve multiple shippers within the same day since it is not bound by an exclusive contract.'
    ],
    relatedTerms: ['Carrier', 'Contract carrier', 'Shipper']
  },
  {
    id: 'contract-carrier',
    term: 'Contract carrier',
    letter: 'C',
    page: 4,
    category: 'roles',
    icon: '',
    calloutEs: 'Company or person providing transport services for a specified shipper on a long-term basis under mutually agreed contract conditions.',
    definitionEn: 'Refers to the company or person who provides transport services for a specified shipper on a long-term basis. This means the contract carrier reaches a common agreement with the shipper and agrees to work under certain conditions over the length of the contract.',
    explanationEs: 'Transportista por contrato que establece un acuerdo formal a largo plazo con un shipper específico, comprometiéndose a operar bajo tarifas y condiciones determinadas durante la vigencia del contrato.',
    details: [
      'Provides transport services for a specified shipper on a long-term basis.',
      'Operates under mutually agreed terms, rates, and conditions over the duration of the contract.'
    ],
    relatedTerms: ['Carrier', 'Common Carrier', 'Carrier Account Application']
  },
  {
    id: 'carrier-package',
    term: 'Carrier Package',
    letter: 'C',
    page: 4,
    category: 'documents',
    icon: '',
    calloutEs: 'Onboarding document package required to formally register a carrier: Carrier Account Application, W9, Certificate of Liability Insurance, and Authority.',
    definitionEn: 'A package that contents: Carrier Account Application, Tax Identification Number (W9), Certificate of Liability Insurance, Authority. The above documents are requested to the transport company for their formal registration in our system.',
    explanationEs: 'Expediente de alta y cumplimiento que el broker solicita a una compañía de transporte para registrarla formalmente en su sistema operativo.',
    details: [
      '1. Carrier Account Application (contract between broker and carrier).',
      '2. Tax Identification Number (IRS Form W9).',
      '3. Certificate of Liability Insurance.',
      '4. Operating Authority (MC Number).'
    ],
    relatedTerms: ['Carrier Account Application', 'W9', 'Shipper Package', 'MC Number']
  },
  {
    id: 'carrier-account-application',
    term: 'Carrier Account Application',
    letter: 'C',
    page: 4,
    category: 'documents',
    icon: '',
    calloutEs: 'Formal contract between freight brokers and carriers to arrange and govern transportation services.',
    definitionEn: 'The contract between brokers and carriers to arrange transportation.',
    explanationEs: 'Documento contractual que firman el agente de carga (freight broker) y el transportista (carrier) para establecer los términos legales y operativos del servicio de transporte.',
    details: [
      'Core component of the Carrier Package required for carrier onboarding.',
      'Establishes legal terms and obligations between freight brokers and carriers.'
    ],
    relatedTerms: ['Carrier Package', 'Freight Broker', 'Carrier', 'Rate Confirmation']
  },
  {
    id: 'cash-on-delivery-cod',
    term: 'Cash on Delivery (COD)',
    acronym: 'COD',
    letter: 'C',
    page: 4,
    category: 'finance',
    icon: '',
    calloutEs: 'Transaction in which the recipient makes payment for a good at the exact time of delivery.',
    definitionEn: 'A type of transaction in which the recipient makes payment for a good at the time of delivery',
    explanationEs: 'Pago contra entrega: modalidad transaccional donde el receptor (recipient/consignee) paga por la mercancía en el momento en que esta es entregada en destino.',
    details: [
      'Payment is collected from the recipient at the destination upon delivery.',
      'Contrasts with Cash on Pick up (COP) and Prepaid shipping terms.'
    ],
    relatedTerms: ['Cash on Pick up (COP)', 'Prepaid', 'Delivery']
  },
  {
    id: 'cash-on-pick-up-cop',
    term: 'Cash on Pick up (COP)',
    acronym: 'COP',
    letter: 'C',
    page: 4,
    category: 'finance',
    icon: '',
    calloutEs: 'Transaction in which the recipient makes payment for a good at the time of pick up.',
    definitionEn: 'A type of transaction in which the recipient makes payment for a good at the time of pick up.',
    explanationEs: 'Pago al recoger: transacción comercial en la que el pago se liquida en el momento mismo en que la mercancía es recolectada en el punto de origen.',
    details: [
      'Payment is made at the time of pick up at the origin location.',
      'Contrasts with Cash on Delivery (COD).'
    ],
    relatedTerms: ['Cash on Delivery (COD)', 'Pick up', 'Prepaid']
  },
  {
    id: 'certificate-holder',
    term: 'Certificate Holder',
    letter: 'C',
    page: 4,
    category: 'regulation',
    icon: '',
    calloutEs: 'Entity granted the right to use a Certificate of Insurance maintained by another entity in case an accident occurs.',
    definitionEn: 'The entity that receive the right to use a certificate of insurance maintained by another entity in case an accident occurs. In standard certificate forms, the certificate holder is usually listed in the space provided for that purpose.',
    explanationEs: 'Titular del certificado de seguro: la empresa o entidad (por ejemplo, el Freight Broker o Shipper) que figura en el formulario estándar del certificado de seguro del transportista para estar protegida en caso de siniestro.',
    details: [
      'Listed in the designated Certificate Holder box on standard Certificate of Insurance (COI) forms.',
      'Required during Carrier Package verification to ensure coverage if an accident occurs.'
    ],
    relatedTerms: ['Insurance', 'Cargo Insurance', 'Liability Insurance', 'Carrier Package']
  },
  {
    id: 'claim',
    term: 'Claim',
    letter: 'C',
    page: 5,
    category: 'regulation',
    icon: '',
    calloutEs: 'Legal demand by a shipper or consignee to a carrier seeking financial reimbursement for loss, damage, or shortage of a shipment.',
    definitionEn: 'A legal demand by a shipper or consignee to a carrier for financial reimbursement for a loss or damage of a shipment. Freight claims are also known as shipping claims, cargo claims, transportation claims or loss and damage claims. Typically, there are four common types of freight claims that you will encounter in the industry. Damage, loss, shortage, and concealed damage or shortage are the common claims that can occur in logistics.',
    explanationEs: 'Reclamo de carga (también llamado shipping claim, cargo claim, transportation claim o loss and damage claim): exigencia legal presentada por el embarcador o destinatario al transportista para obtener compensación económica ante pérdidas o daños en el envío.',
    details: [
      'Also known as: Shipping claims, cargo claims, transportation claims, or loss and damage claims.',
      'Four common types of freight claims in logistics:',
      '1. Damage (visible physical damage to goods).',
      '2. Loss (total or partial loss of the shipment).',
      '3. Shortage (delivered quantity is less than stated on the BOL).',
      '4. Concealed damage or shortage (discovered after opening packages post-delivery).'
    ],
    relatedTerms: ['Clean Bill', 'P.O.D (Proof of Delivery)', 'Cargo Insurance']
  },
  {
    id: 'clean-bill',
    term: 'Clean Bill',
    letter: 'C',
    page: 5,
    category: 'documents',
    icon: '',
    calloutEs: 'Document issued by the carrier after thoroughly inspecting packages declaring zero damage, missing quantities, or quality deviations.',
    definitionEn: 'A document that declares there was no damage to or loss of goods during shipment. The clean bill of lading is issued by the product carrier after thoroughly inspecting all packages for any damage, missing quantities, or deviations in quality.',
    explanationEs: 'Conocimiento de embarque limpio (Clean Bill of Lading): documento que certifica que las mercancías fueron recibidas y transportadas sin daños, pérdidas, cantidades faltantes ni alteraciones de calidad tras una inspección exhaustiva.',
    details: [
      'Issued by the product carrier after thoroughly inspecting all packages.',
      'Confirms zero damage, no missing quantities, and no deviations in quality.'
    ],
    relatedTerms: ['Freight bill-of-lading (BOL)', 'P.O.D (Proof of Delivery)', 'Claim']
  },
  {
    id: 'consignee',
    term: 'Consignee',
    letter: 'C',
    page: 5,
    category: 'roles',
    icon: '',
    calloutEs: 'Individual or firm to whom freight is shipped; the final freight receiver.',
    definitionEn: 'An individual or firm to whom freight is shipped. A freight receiver.',
    explanationEs: 'Consignatario o destinatario: la persona o compañía que recibe formalmente la mercancía en el punto de destino.',
    details: [
      'Direct synonym in the document: Receiver (Freight receiver).',
      'Signs the BOL upon delivery, converting it into a P.O.D (Proof of Delivery).'
    ],
    relatedTerms: ['Receiver', 'Consignor', 'Shipper', 'P.O.D (Proof of Delivery)']
  },
  {
    id: 'consignor',
    term: 'Consignor',
    letter: 'C',
    page: 5,
    category: 'roles',
    icon: '',
    calloutEs: 'Individual or firm that sends freight; the freight originator.',
    definitionEn: 'An individual or firm that sends freight. A freight originator.',
    explanationEs: 'Consignador o remitente: la persona o firma que origina y despacha el envío de mercancías desde el punto de partida.',
    details: [
      'Also referred to as the Shipper or Freight Originator.',
      'Typically bears the cost of freight unless otherwise specified in the transport contract.'
    ],
    relatedTerms: ['Shipper', 'Consignee', 'Freight bill-of-lading (BOL)']
  },
  {
    id: 'consolidation',
    term: 'Consolidation',
    letter: 'C',
    page: 5,
    category: 'operations',
    icon: '',
    calloutEs: 'Combining many small shipments (often from different shippers) into large shipment quantities to achieve economies of scale in transport costs.',
    definitionEn: 'Bringing together many small shipments, often from different shippers, into large shipment quantities, in order to take advantage of economies of scale in transportation costs. In vehicle consolidation is when a vehicle makes pickups from many customers and consolidates freight inside the vehicle. Out-of-vehicle consolidation occurs at a terminal facility; shipments to a single customer/region are consolidated before shipment.',
    explanationEs: 'Consolidación de carga: estrategia logística que combina múltiples envíos pequeños de diferentes clientes en una sola unidad de gran volumen para reducir costos mediante economías de escala.',
    details: [
      'In-vehicle consolidation: A vehicle makes pickups from multiple customers and consolidates freight inside the vehicle.',
      'Out-of-vehicle consolidation: Occurs at a terminal facility where shipments heading to a single customer or region are grouped prior to dispatch.'
    ],
    relatedTerms: ['Less Than Truckload (LTL)', 'Cross Dock', 'Warehouse']
  },
  {
    id: 'comcheck',
    term: 'Comcheck',
    letter: 'C',
    page: 5,
    category: 'finance',
    icon: '',
    calloutEs: 'Payment method issued via COMDATA using a 14-to-18-digit numeric Express Code, widely used by brokers to pay carriers or issue fuel advances.',
    definitionEn: 'A form of payment most frequently used by freight brokers to pay contract carriers, and they work in a similar way to a regular check but with some differences. A payer (shipper or a broker) that has an account with COMDATA, issues COMCHEKs to drivers for services rendered or as a fuel advance and they do so in a form of an Express Code for a predetermined amount. The Express Codes vary in length, usually from 14 to 18 digits in length, but will always be just numbers not letters. Once the payee (trucking company) receives their express codes they have several options to redeem their money. Comcheks can be cashed at truck stops or any bank as long as Comchek blank is present.',
    explanationEs: 'Forma de pago sumamente utilizada por brokers de carga para pagar a transportistas por servicios prestados o adelantos de combustible (fuel advances). Funciona mediante un código numérico (Express Code) emitido con una cuenta COMDATA que se plasma en un cheque en blanco Comchek.',
    details: [
      'Issuer: A payer (shipper or broker) holding an active COMDATA account.',
      'Express Code Format: 14 to 18 digits in length, consisting strictly of numbers (never letters).',
      'Common Use Cases: Payment for services rendered, Lumper Fees, or driver fuel advances.',
      'Redemption: Can be cashed at truck stops or any bank as long as a blank Comchek form is present.'
    ],
    relatedTerms: ['ACH', 'Quick pay', 'Wire Transfer', 'Freight Broker']
  },
  {
    id: 'commercial-invoice',
    term: 'Commercial Invoice',
    letter: 'C',
    page: 6,
    category: 'documents',
    icon: '',
    calloutEs: 'Required document identifying the transaction between seller and buyer, detailing dates, transport mode, delivery/payment terms, goods description, and quantity.',
    definitionEn: 'A required document identifying the transaction between a seller and buyer. The form should have the invoice number, date, shipping date, the mode of transport, delivery and payment terms, description of goods and the quantity.',
    explanationEs: 'Factura comercial: documento requerido que respalda la compraventa entre vendedor y comprador y detalla las condiciones logísticas y comerciales del envío, esencial en comercio e importación/exportación.',
    details: [
      'Required fields on the form:',
      '• Invoice number, date, and shipping date.',
      '• Mode of transport.',
      '• Delivery and payment terms.',
      '• Description of goods and quantity.'
    ],
    relatedTerms: ['Invoice', 'P.O Number (Purchase Order Number)', 'Freight bill-of-lading (BOL)']
  },
  {
    id: 'conestoga',
    term: 'Conestoga',
    letter: 'C',
    page: 6,
    category: 'equipment',
    icon: '',
    calloutEs: 'Flatbed frame trailer equipped with a rolling tarp-on-frame system designed to protect oversized and delicate cargo from the elements.',
    definitionEn: 'Starts with a flatbed frame trailer, which makes loading and unloading a variety of ways easy, securing to a flatbed trailer is also convenient too, it allows the ability to secure loads from several groups of palletized loads to large oversized equipment, it uses a rolling tarp-on frame system. It is made for protecting oversized and specialized loads, keeping them safe from the elements without compromising delicate machinery, paint, finishes or other features of your cargo that might be damaged if a tarp is simply thrown over the load.',
    explanationEs: 'Semirremolque tipo plataforma (flatbed) que incorpora una estructura con lona retráctil deslizable. Permite cargar fácilmente por los costados o por arriba y protege maquinaria delicada, pintura o acabados sin que una lona convencional roce y dañe la carga.',
    details: [
      'Combines flatbed loading/securement versatility with enclosed weather protection.',
      'Uses a rolling tarp-on-frame system.',
      'Protects delicate machinery, paint, and finishes that could be damaged by throwing a conventional tarp directly over the cargo.'
    ],
    relatedTerms: ['Flatbed', 'Tarp', 'Dry Van', 'Lowboy']
  },
  {
    id: 'crm',
    term: 'CRM',
    acronym: 'CRM',
    letter: 'C',
    page: 7,
    category: 'technology',
    icon: '',
    calloutEs: 'Customer Relationship Management: approach and system that compiles multi-channel customer data to improve retention and drive sales growth.',
    definitionEn: "One of many different approaches that allow a company to manage and analyze its own interactions with its past, current and potential customers. It uses data analysis about customers' history with a company to improve business relationships with customers, specifically focusing on customer retention and ultimately driving sales growth. One important aspect of the CRM approach is the systems of CRM that compile data from a range of different communication channels, including a company's website, telephone, email, live chat, marketing materials and more recently, social media. Through the CRM approach and the systems used to facilitate it, businesses learn more about their target audiences and how to best cater to their needs.",
    explanationEs: 'Gestión de Relaciones con los Clientes: estrategia y plataforma informática que recopila datos de múltiples canales de comunicación para analizar el historial de los clientes, mejorar la retención e incrementar el crecimiento en ventas.',
    details: [
      'Core Objectives: Improve business relationships, increase customer retention, and drive sales growth.',
      'Integrated Channels: Website, telephone, email, live chat, marketing materials, and social media.'
    ],
    relatedTerms: ['Hubspot', 'Transportation Management System (TMS)', 'ITS Dispatch']
  },
  {
    id: 'cross-dock',
    term: 'Cross Dock',
    letter: 'C',
    page: 7,
    category: 'operations',
    icon: '',
    calloutEs: 'Supply chain facility that receives goods from suppliers and immediately sorts and stages them for onward delivery with zero reserve storage.',
    definitionEn: 'A facility in a supply chain, which receives goods from suppliers and sorts these goods into alternative groupings based on the downstream delivery point. No reserve storage of the goods occurs, and staging occurs only for the short periods required to assemble a consolidated, economical load for immediate onward carriage via the same mode as the receipt, or a different mode. Cross-docks exist in many different types of supply chains, including those sending parts and assemblies to manufacturing plants, those managing finished vehicle distribution using rail based cross-docks, those involved in retail distribution, and many others. Cross-docks can add value to supply chains where the potential exists to improve transport efficiency, reduce inventory, or speed movement of products.',
    explanationEs: 'Cruce de andén: centro logístico donde los productos recibidos de los proveedores se clasifican y reorganizan según su destino final para ser despachados de inmediato, eliminando el almacenamiento prolongado.',
    details: [
      'No Reserve Storage: Staging occurs only for the brief period needed to assemble a consolidated load for immediate onward carriage.',
      'Industry Applications: Automotive parts to manufacturing plants, rail-based finished vehicle distribution, and retail distribution.',
      'Supply Chain Value: Improves transport efficiency, reduces inventory holding, and speeds product movement.'
    ],
    relatedTerms: ['Consolidation', 'Warehouse', 'Loading Dock', 'Supply chain']
  },

  // ================= D =================
  {
    id: 'delivery',
    term: 'Delivery',
    letter: 'D',
    page: 7,
    category: 'operations',
    icon: '',
    calloutEs: 'Process of transporting goods from a source location to a predefined destination (closely linked to distribution and logistics).',
    definitionEn: 'The process of transporting goods from a source location to a predefined destination. The general process of delivering goods is known as distribution. The study of effective processes for delivery and disposition of goods and personnel is called logistics.',
    explanationEs: 'Entrega: traslado de bienes desde un origen hasta un destino acordado. El documento destaca que el proceso general de entregar bienes se conoce como distribución (distribution), y el estudio de los procesos efectivos para la entrega y disposición de bienes y personal se denomina logística (logistics).',
    details: [
      'Delivery: Transporting goods from a source location to a predefined destination.',
      'Distribution: The general process of delivering goods.',
      'Logistics: The study of effective processes for the delivery and disposition of goods and personnel.'
    ],
    relatedTerms: ['Pick up', 'P.O.D (Proof of Delivery)', 'Supply chain']
  },
  {
    id: 'detention',
    term: 'Detention',
    letter: 'D',
    page: 7,
    category: 'finance',
    icon: '',
    calloutEs: 'Penalty charges assessed by a carrier to a shipper or consignee for holding transportation equipment beyond the stipulated loading or unloading free time.',
    definitionEn: 'Penalty charges assessed by a carrier to a shipper or consignee for holding transportation equipment, i.e. trailers, containers, railcars, longer than a stipulated time for loading or unloading.',
    explanationEs: 'Cargo por demora o detención: tarifa de penalización que cobra el transportista al embarcador o receptor cuando el camión, remolque, contenedor o vagón es retenido en las instalaciones excediendo el tiempo libre acordado para cargar o descargar.',
    details: [
      'Applies to transportation equipment including trailers, containers, and railcars.',
      'Assessed when loading or unloading exceeds the stipulated free time.'
    ],
    relatedTerms: ['Layover', 'Live Load', 'Appointment', 'TONU (Truck Ordered, not Used)']
  },
  {
    id: 'dispatcher',
    term: 'Dispatcher',
    letter: 'D',
    page: 7,
    category: 'roles',
    icon: '',
    calloutEs: 'Communication worker who receives and transmits information to coordinate the operations of personnel and vehicles carrying out a service.',
    definitionEn: 'A communication worker who receives and transmits information to coordinate operations of other personnel and vehicles carrying out a service.',
    explanationEs: 'Despachador: profesional encargado de la comunicación y coordinación operativa entre conductores, vehículos y clientes para asegurar la ejecución eficiente del servicio de transporte.',
    details: [
      'Acts as the central communication link between drivers, freight brokers, and shippers.',
      'Coordinates schedules, appointments, routing, and real-time tracking updates.'
    ],
    relatedTerms: ['Dispatching', 'ITS Dispatch', 'Driver', 'Freight Broker']
  },
  {
    id: 'dispatching',
    term: 'Dispatching',
    letter: 'D',
    page: 7,
    category: 'roles',
    icon: '',
    calloutEs: 'Companies or services that assist truck drivers in negotiating rates, booking loads, and handling administrative paperwork.',
    definitionEn: 'Companies that help truck drivers to negotiate and acquire loads and handle paperwork.',
    explanationEs: 'Servicio de despacho: compañías dedicadas a asistir a los camioneros (especialmente Owner Operators) en la búsqueda de cargas, negociación de tarifas con brokers y administración de documentos.',
    details: [
      'Core Services: Negotiating freight rates, booking loads on Load Boards, and managing carrier paperwork (BOL, POD, invoicing).'
    ],
    relatedTerms: ['Dispatcher', 'Owner Operator', 'Rate Confirmation', 'Load Board']
  },
  {
    id: 'distributor',
    term: 'Distributor',
    letter: 'D',
    page: 8,
    category: 'roles',
    icon: '',
    calloutEs: 'Business that purchases and resells finished products rather than manufacturing them, typically maintaining a finished goods inventory.',
    definitionEn: 'A business that does not manufacture its own products, but purchases and resells these products. Such a business usually maintains a finished goods inventory.',
    explanationEs: 'Distribuidor: entidad comercial que adquiere productos terminados de los fabricantes (manufacturers) para almacenarlos en inventario y revenderlos en la cadena de suministro.',
    details: [
      'Purchases and resells products rather than manufacturing them.',
      'Typically maintains a finished goods inventory in warehouses.'
    ],
    relatedTerms: ['Manufacturer', 'Warehouse', 'Supply chain']
  },
  {
    id: 'dot-number',
    term: 'Dot number',
    acronym: 'USDOT',
    letter: 'D',
    page: 8,
    category: 'regulation',
    icon: '',
    calloutEs: 'Mandatory unique identifier registered with the FMCSA for companies operating commercial vehicles in interstate commerce or hauling regulated HAZMAT.',
    definitionEn: "Companies that operate commercial vehicles transporting passengers or hauling cargo in interstate commerce must be registered with the FMCSA and must have a USDOT Number. Also, commercial intrastate hazardous materials carriers who haul types and quantities requiring a safety permit must register for a USDOT Number. The USDOT Number serves as a unique identifier when collecting and monitoring a company's safety information acquired during audits, compliance reviews, crash investigations, and inspections",
    explanationEs: 'Número USDOT: código de identificación único asignado por la FMCSA a las compañías de transporte comercial. Sirve para recopilar y monitorear el historial de seguridad de la empresa en auditorías, revisiones de cumplimiento, investigaciones de accidentes e inspecciones.',
    details: [
      'Mandatory for interstate commercial vehicles (passengers or cargo) and intrastate HAZMAT carriers requiring a safety permit.',
      'Used by the FMCSA to monitor safety records across audits, compliance reviews, crash investigations, and roadside inspections.'
    ],
    relatedTerms: ['Federal Motor Carrier Safety Administration (FMCSA)', 'MC Number', 'Safety Rating', 'HAZMAT']
  },
  {
    id: 'driver',
    term: 'Driver',
    letter: 'D',
    page: 8,
    category: 'roles',
    icon: '',
    calloutEs: 'Professional who earns a living driving a commercial truck (typically a semi-truck, box truck, or dump truck).',
    definitionEn: 'A person who earns a living driving a truck (usually a semi-truck, box truck or dump truck).',
    explanationEs: 'Conductor o chofer profesional dedicado a la operación de camiones comerciales como tractocamiones (semi-trucks), camiones de caja cerrada (box trucks) o camiones de volteo (dump trucks).',
    details: [
      'Operates commercial vehicles such as semi-trucks, box trucks, or dump trucks.',
      'Driving hours are governed by federal Hours-of-Service (H.O.S) regulations and recorded via ELD.'
    ],
    relatedTerms: ['Owner Operator', 'ELD', 'H.O.S', 'Truck']
  },
  {
    id: 'dropdeck-trailer',
    term: 'Dropdeck Trailer',
    letter: 'D',
    page: 8,
    category: 'equipment',
    icon: '',
    calloutEs: 'Open platform semi-trailer with no sides, roof, or doors and two deck levels that allow hauling taller loads than a standard straight flatbed.',
    definitionEn: 'A platform semi-trailer with no sides, no roof and no doors, and it has two deck levels. The floor drops down after it clears the tractor unit. The lower deck allows for hauling taller loads than a regular straight floor flatbed.',
    explanationEs: 'También conocido como Step Deck: semirremolque abierto de plataforma con dos niveles de piso. El piso desciende justo después de librar el tractocamión, permitiendo llevar mercancía de mayor altura sin exceder los límites legales de gálibo.',
    details: [
      'Open Structure: No sides, no roof, and no doors.',
      'Two Deck Levels: The deck drops down after clearing the tractor unit, accommodating taller cargo than a standard straight-floor flatbed.'
    ],
    relatedTerms: ['Flatbed', 'Lowboy', 'Gooseneck Trailer']
  },
  {
    id: 'dry-van',
    term: 'Dry Van',
    letter: 'D',
    page: 8,
    category: 'equipment',
    icon: '',
    calloutEs: 'Standard 48\' or 53\' enclosed trailer (generally 44,000 lbs weight limit) loaded from the rear to transport freight that must be kept dry.',
    definitionEn: "They are used for the transport of freight that must be kept dry. They are normally loaded from the rear by forklifts or pallet jacks. It is available in 48' or 53' lengths with the latter being the more common. The weight limit is generally 44,000 lbs for these trailers.",
    explanationEs: 'Caja seca: el tipo más común de semirremolque cerrado, diseñado para proteger la carga de la intemperie y mantenerla seca. Se carga por las puertas traseras utilizando montacargas (forklifts) o patines hidráulicos (pallet jacks).',
    details: [
      'Lengths: 48 ft or 53 ft (with 53 ft being the most common).',
      'Weight Limit: Generally 44,000 lbs (up to 45,000 lbs per the Overweight section).',
      'Loading Method: Loaded from the rear using forklifts or pallet jacks.'
    ],
    relatedTerms: ['Van', 'Vented Van', 'Reefer', 'Flatbed']
  },

  // ================= E =================
  {
    id: 'eld',
    term: 'ELD',
    acronym: 'ELD',
    letter: 'E',
    page: 9,
    category: 'regulation',
    icon: '',
    calloutEs: 'Electronic Logging Device: hardware attached to a commercial motor vehicle engine to automatically record driving hours under HOS rules.',
    definitionEn: 'An electronic hardware that is attached to a commercial motor vehicle engine to record driving hours. The driving hours of commercial drivers (truck and bus drivers) are typically regulated by a set of rules known as the hours of service (HOS) in the United States.',
    explanationEs: 'Dispositivo de Registro Electrónico: equipo de hardware conectado directamente al motor del camión o autobús comercial que registra de forma automática el tiempo de manejo para cumplir con las regulaciones federales de Horas de Servicio (HOS) en EE. UU.',
    details: [
      'Attaches directly to a commercial motor vehicle engine to automatically log driving time.',
      'Ensures compliance with federal Hours of Service (HOS) regulations in the United States.'
    ],
    relatedTerms: ['H.O.S', 'Federal Motor Carrier Safety Administration (FMCSA)', 'Driver']
  },
  {
    id: 'end-dump-trailer',
    term: 'End Dump Trailer',
    letter: 'E',
    page: 9,
    category: 'equipment',
    icon: '',
    calloutEs: 'Dump trailer that unloads out of its rear by lifting the box high into the air; requires caution on uneven ground due to instability risk.',
    definitionEn: 'Unloads out of its rear, with the “box” lifted into the air. With an end dump, the box has to be raised high enough to unload its cargo, making the unit unstable, especially on uneven ground.',
    explanationEs: 'Remolque basculante o de volteo trasero: descarga el material a granel por la parte posterior levantando hidráulicamente la caja ("box") hacia arriba.',
    details: [
      'Unloads bulk cargo out of the rear by lifting the box high into the air.',
      'Safety Consideration: Raising the box high makes the unit susceptible to instability, particularly on uneven ground.'
    ],
    relatedTerms: ['Hopper', 'Trailer', 'Driver']
  },
  {
    id: 'estimated-time-of-arrival-eta',
    term: 'Estimated time of arrival (ETA)',
    acronym: 'ETA',
    letter: 'E',
    page: 10,
    category: 'operations',
    icon: '',
    calloutEs: 'The time when a carrier estimates that a means of transport will arrive at its place of destination.',
    definitionEn: 'The time when a carrier estimates that a means of transport will arrive at its place of destination',
    explanationEs: 'Tiempo Estimado de Llegada: cálculo de fecha y hora en que el transportista prevé que la unidad arribará al punto de entrega o recolección.',
    details: [
      'Key metric communicated during shipment Tracking between dispatchers, brokers, and shippers.'
    ],
    relatedTerms: ['Appointment', 'Tracking', 'Delivery']
  },
  {
    id: 'expedited-freight',
    term: 'Expedited Freight',
    letter: 'E',
    page: 10,
    category: 'operations',
    icon: '',
    calloutEs: 'Time-critical service using small dedicated trucks to pick up loads that would normally move as LTL when delivery speed is paramount.',
    definitionEn: 'A service in which we use small trucks to pick up loads that we usually move as LTL loads when the time of delivery is a critical factor.',
    explanationEs: 'Carga expedita o urgente: modalidad de transporte expreso donde se emplean vehículos más pequeños y dedicados para mover envíos que normalmente irían en LTL, priorizando la velocidad cuando el plazo de entrega es crítico.',
    details: [
      'Uses smaller dedicated trucks to move shipments that would normally travel as LTL.',
      'Selected when delivery time is a critical factor.'
    ],
    relatedTerms: ['Less Than Truckload (LTL)', 'Hotshot', 'Full Truck Loaded (FTL)']
  },

  // ================= F =================
  {
    id: 'factoring-company',
    term: 'Factoring Company',
    letter: 'F',
    page: 10,
    category: 'finance',
    icon: '',
    calloutEs: 'Financial business that purchases another company’s invoices to provide immediate cash flow against slow-paying customers or rapid growth.',
    definitionEn: 'A business that purchases another company’s invoices. Working with factoring companies is a popular financing solution for businesses that have cash flow issues due to slow-paying customers, seasonal highs and lows or rapid growth.',
    explanationEs: 'Compañía de factoraje: entidad financiera que adquiere las cuentas por cobrar (facturas/invoices) de los transportistas, adelantándoles el efectivo para resolver problemas de flujo de caja por clientes que pagan a 30–60 días, estacionalidad o crecimiento acelerado.',
    details: [
      'Purchases a trucking company’s invoices to provide immediate cash flow.',
      'Addresses cash flow challenges caused by slow-paying customers, seasonal fluctuations, or rapid growth.',
      'Issues a Notice of Assignments (NOA) to inform customers where future payments must be remitted.'
    ],
    relatedTerms: ['Notice of Assignments', 'Quick pay', 'Invoice']
  },
  {
    id: 'fahrenheit',
    term: 'Fahrenheit',
    letter: 'F',
    page: 10,
    category: 'operations',
    icon: '',
    calloutEs: 'Temperature scale (°F) proposed in 1724 by physicist Daniel Gabriel Fahrenheit; standard unit for Reefer temperature control in the U.S.',
    definitionEn: 'A temperature scale based on one proposed in 1724 by the physicist Daniel Gabriel Fahrenheit (1686–1736). It uses the degree Fahrenheit (symbol: °F) as the unit',
    explanationEs: 'Escala de temperatura expresada en grados Fahrenheit (°F), propuesta en 1724 por Daniel Gabriel Fahrenheit (1686–1736). Es la unidad estándar utilizada en el transporte refrigerado (Reefer) en Estados Unidos.',
    details: [
      'Unit Symbol: °F (proposed in 1724 by physicist Daniel Gabriel Fahrenheit).',
      'Standard temperature unit used for setting Reefer thermostats and Data Loggers in U.S. logistics.'
    ],
    relatedTerms: ['Reefer', 'Temperature Recorder or Data Logger']
  },
  {
    id: 'fmcsa',
    term: 'Federal Motor Carrier Safety Administration (FMCSA)',
    acronym: 'FMCSA',
    letter: 'F',
    page: 10,
    category: 'regulation',
    icon: '',
    calloutEs: 'U.S. Department of Transportation (USDOT) agency regulating the trucking industry with the primary mission of reducing crashes, injuries, and fatalities.',
    definitionEn: 'An agency in the United States Department of Transportation that regulates the trucking industry in the United States. The primary mission of the FMCSA is to reduce crashes, injuries and fatalities involving large trucks and buses.',
    explanationEs: 'Administración Federal de Seguridad de Autotransportes: organismo federal perteneciente al Departamento de Transporte de EE. UU. encargado de regular el sector de camiones y autobuses comerciales.',
    details: [
      'Agency within the U.S. Department of Transportation (USDOT) regulating the trucking industry.',
      'Primary Mission: Reduce crashes, injuries, and fatalities involving large trucks and buses.'
    ],
    relatedTerms: ['Dot number', 'MC Number', 'H.O.S', 'ELD', 'Safety Rating']
  },
  {
    id: 'first-come-first-serve-fcfs',
    term: 'First Come, First Serve (FCFS)',
    acronym: 'FCFS',
    letter: 'F',
    page: 10,
    category: 'operations',
    icon: '',
    calloutEs: 'Queueing method where the first truck to arrive is served first at the head of the line and subsequent arrivals are added to the rear.',
    definitionEn: 'The process that arrives first becomes the head of the queue while the others that arrive after are added to the rear of the queue.',
    explanationEs: 'Primero en llegar, primero en ser atendido: sistema operativo en almacenes y muelles de carga donde los camiones son cargados o descargados según su orden de arribo dentro de una ventana horaria, sin cita fija individual.',
    details: [
      'The first truck to arrive becomes the head of the queue; subsequent arrivals are added to the rear.',
      'Contrasts with scheduled Appointment loading/unloading.'
    ],
    relatedTerms: ['Appointment', 'Loading Dock', 'Live Load']
  },
  {
    id: 'flatbed',
    term: 'Flatbed',
    letter: 'F',
    page: 10,
    category: 'equipment',
    icon: '',
    calloutEs: 'Open truck bed or trailer hauling 44,000 to 48,000 lbs of heavy machinery, steel, or lumber, secured with chains, straps, binders, and tarps.',
    definitionEn: 'An open truck bed or trailer used to carry objects such as heavy machinery, steel, lumber, building products, etc. Flatbeds utilize numerous securement devices including chains, straps and binders along with various lengths of tarps for weather protection of the transported products. There are a few flatbed subtypes, such as lowboy and drop-deck trailers. Flatbed trailers can haul 44,000 to 48,000 lbs.',
    explanationEs: 'Plataforma abierta: remolque sin techo ni paredes laterales utilizado para transportar maquinaria pesada, acero, madera y materiales de construcción.',
    details: [
      'Payload Capacity: 44,000 to 48,000 lbs.',
      'Securement & Protection: Uses chains, straps, binders, and various lengths of tarps.',
      'Subtypes: Includes Lowboy and Drop-deck trailers.'
    ],
    relatedTerms: ['Dropdeck Trailer', 'Lowboy', 'Conestoga', 'Straps', 'Tarp']
  },
  {
    id: 'fork-lift',
    term: 'Fork lift',
    letter: 'F',
    page: 11,
    category: 'equipment',
    icon: '',
    calloutEs: 'Powered industrial truck indispensable in manufacturing and warehousing for lifting and moving materials over short distances.',
    definitionEn: 'A powered industrial truck used to lift and move materials over short distances. Forklifts have become an indispensable piece of equipment in manufacturing and warehousing.',
    explanationEs: 'Montacargas o carretilla elevadora: vehículo industrial motorizado diseñado para elevar, trasladar y estibar cargas paletizadas en distancias cortas dentro de almacenes y plantas de manufactura.',
    details: [
      'Powered industrial truck used to lift and move materials over short distances.',
      'Indispensable equipment in manufacturing, warehousing, and Loading Dock operations.'
    ],
    relatedTerms: ['Pallet', 'Palletization', 'Warehouse', 'Loading Dock']
  },
  {
    id: 'freight-broker',
    term: 'Freight Broker',
    letter: 'F',
    page: 11,
    category: 'roles',
    icon: '',
    calloutEs: 'Person or organization that assists shippers in moving freight from origin to destination by arranging qualified carriers and providing status updates.',
    definitionEn: 'A person or an organization that assists shippers in moving shipments from the point of origin to their destinations by employing the service of carrier companies. In essence, the freight broker helps the shipper to find carriers for the transportation of goods. Apart from organizing carriers for shipper, the freight broker is responsible in facilitating the delivery of goods to their destination; provides updates about the status of the shipment.',
    explanationEs: 'Agente o corredor de carga: intermediario logístico que conecta a los embarcadores (shippers) con transportistas calificados (carriers), coordinando la recolección, el tránsito, las actualizaciones de estado (tracking) y la entrega final.',
    details: [
      'Connects shippers with qualified carrier companies to move freight from origin to destination.',
      'Facilitates end-to-end delivery and provides shipment status updates.',
      'Issues the legally binding Rate Confirmation to the carrier.'
    ],
    relatedTerms: ['Shipper', 'Carrier', 'Rate Confirmation', 'Freight Forwarder']
  },
  {
    id: 'freight-forwarder',
    term: 'Freight Forwarder',
    letter: 'F',
    page: 11,
    category: 'roles',
    icon: '',
    calloutEs: 'Agency that receives freight from a shipper and arranges transportation with one or more carriers to the consignee; widely used in international shipping.',
    definitionEn: 'An agency that receives freight from a shipper and then arranges for transportation with one or more carriers for transport to the consignee. Often used for international shipping.',
    explanationEs: 'Agente transitario o expedidor de carga: agencia logística que recibe la mercancía del embarcador y coordina su traslado mediante uno o múltiples transportistas (multimodal) hasta el destinatario final, siendo clave en el comercio internacional.',
    details: [
      'Receives freight from a shipper and arranges transport across one or multiple carriers to the consignee.',
      'Frequently utilized for international shipping.'
    ],
    relatedTerms: ['Freight Broker', 'Shipper', 'Consignee', 'Consolidation']
  },
  {
    id: 'freight-bill-of-lading-bol',
    term: 'Freight bill-of-lading (BOL)',
    acronym: 'BOL',
    letter: 'F',
    page: 12,
    category: 'documents',
    icon: '',
    calloutEs: 'Document providing a binding contract between a shipper and a carrier specifying the obligations of both parties and serving as a receipt of freight.',
    definitionEn: 'A document providing a binding contract between a shipper and a carrier for the transportation of freight, specifying the obligations of both parties. Serves as a receipt of freight by the carrier for the shipper.',
    explanationEs: 'Conocimiento de embarque (Bill of Lading): documento jurídico y operativo fundamental en el transporte que cumple dos funciones: es el contrato vinculante entre embarcador y transportista, y actúa como comprobante de recepción de la mercancía.',
    details: [
      'Provides a binding contract between shipper and carrier specifying the obligations of both parties.',
      'Serves as an official receipt of freight issued by the carrier to the shipper.',
      'Becomes a P.O.D (Proof of Delivery) once signed by the receiver at destination.'
    ],
    relatedTerms: ['Clean Bill', 'P.O.D (Proof of Delivery)', 'Rate Confirmation']
  },
  {
    id: 'freight-class',
    term: 'Freight Class',
    letter: 'F',
    page: 12,
    category: 'regulation',
    icon: '',
    calloutEs: 'NMFTA standardized classification (ranging from class 60 to 400) for LTL shipments based on commodity type and size, determining applicable tariffs.',
    definitionEn: 'Determined by the NMFTA, or National Motor Freight Traffic Association. Generally, every type of product or commodity has a National Motor Freight Classification, which is then assigned a specific freight class number for LTL freight shipments. Freight class generally ranges from 60 to 400 and is based on specific types of commodities. For example, refrigerators belong to class 92.5, while cabinets are categorized as freight class 110. Freight class matters to LTL carriers as it determines the tariffs they are required to pay for transporting goods. This in turn determines how much a carrier will charge you in shipping rates and fees. Unfortunately, many businesses will underestimate their freight class or otherwise declare an incorrect freight class. While it may seem smart to list a lower freight class to save money, the carrier may need to re-class your freight. This causes delays and can result in wasted money, time, and resources. Freight class is also often tied to the size of a shipment, which the carrier needs to know to better plan how to load a trailer.',
    explanationEs: 'Clase de carga: sistema determinado por la NMFTA (National Motor Freight Traffic Association) que asigna un número de clasificación (generalmente entre 60 y 400) a cada tipo de mercancía en envíos LTL para definir los aranceles y tarifas de transporte.',
    details: [
      'Governing Body: Determined by the NMFTA (National Motor Freight Traffic Association) for LTL shipments.',
      'Range: Generally ranges from class 60 to 400 based on commodity type and shipment size.',
      'Document Examples: Refrigerators belong to class 92.5; cabinets are categorized as class 110.',
      'Re-classification Risk: Declaring an incorrect lower freight class leads carriers to re-class the shipment, causing delays and wasted money, time, and resources.'
    ],
    relatedTerms: ['Less Than Truckload (LTL)', 'Tariff', 'Rate']
  },
  {
    id: 'fob-free-on-board',
    term: 'FOB (free-on-board)',
    acronym: 'FOB',
    letter: 'F',
    page: 12,
    category: 'operations',
    icon: '',
    calloutEs: 'Indicates that a company does not handle shipments directly, leaving clients to take charge of the logistics process.',
    definitionEn: 'Means that a company does not handle shipments directly, in which case it is the clients who take charge of the logistics process.',
    explanationEs: 'Libre a bordo (Free-On-Board): en el contexto operativo descrito por el documento, cuando una empresa opera bajo modalidad FOB significa que no administra el transporte directamente, dejando en manos de sus clientes la gestión del proceso logístico.',
    details: [
      'Indicates that the company does not handle shipments directly; the client takes charge of the logistics process.'
    ],
    relatedTerms: ['Shipper', 'Consignee', 'Delivery']
  },
  {
    id: 'full-truck-loaded-ftl',
    term: 'Full Truck Loaded (FTL)',
    acronym: 'FTL',
    letter: 'F',
    page: 12,
    category: 'operations',
    icon: '',
    calloutEs: 'Truckload shipment where the shipper contracts an entire truck for direct point-to-point service, priced per mile within designated lanes.',
    definitionEn: 'When the shipper contracts an entire truck for direct point-to-point service. Truckload shipments are priced per mile within designated lanes, regardless of the size of the shipment provided it fits (weight, cube) within the vehicle. Less expensive per unit weight shipped than LTL. A truckload carrier is a trucking company specializing in point-to-point truckload shipments.',
    explanationEs: 'Carga de Camión Completo (Full Truckload): modalidad en la que un solo embarcador contrata todo el espacio del remolque para un traslado directo de origen a destino sin escalas de consolidación.',
    details: [
      'Direct point-to-point service contracting an entire truck.',
      'Pricing: Priced per mile within designated lanes, provided the cargo fits within legal weight and cube limits.',
      'Cost Efficiency: Less expensive per unit weight shipped compared to LTL.'
    ],
    relatedTerms: ['Less Than Truckload (LTL)', 'Expedited Freight', 'Lane', 'Rate']
  },

  // ================= G =================
  {
    id: 'gatekeeper',
    term: 'Gatekeeper',
    letter: 'G',
    page: 13,
    category: 'roles',
    icon: '',
    calloutEs: 'Person who controls access to a decision-maker or category; in logistics sales, it specifically refers to the receptionist at a logistics company.',
    definitionEn: 'A person who controls access to something, for example via a city gate or bouncer, or more abstractly, controls who is granted access to a category or status. Gatekeepers assess who is "in or out, in sales gatekeeper refers to the receptionist in a Logistics Company.',
    explanationEs: 'Guardián o filtro de acceso: persona que regula quién entra o tiene acceso a un tomador de decisiones. En el ámbito de ventas dentro de una empresa de logística, el "gatekeeper" se refiere específicamente a la recepcionista o asistente que filtra las llamadas.',
    details: [
      'Controls access to a category, status, or decision-maker.',
      'In logistics sales, "gatekeeper" specifically refers to the receptionist at a logistics company.'
    ],
    relatedTerms: ['Logistics Manager', 'Transportation Manager', 'CRM']
  },
  {
    id: 'gooseneck-trailer',
    term: 'Gooseneck Trailer',
    letter: 'G',
    page: 13,
    category: 'equipment',
    icon: '',
    calloutEs: 'Truck trailer whose forward section is arched like a goose\'s neck and swiveled directly to the motor unit.',
    definitionEn: "A truck trailer whose forward part is arched like a goose's neck and swiveled to the motor unit.",
    explanationEs: 'Remolque cuello de ganso: tipo de remolque para carga pesada cuyo extremo delantero presenta una curvatura arqueada que se engancha sobre la plataforma de la unidad tractora, proporcionando mayor estabilidad y capacidad de giro.',
    details: [
      'Forward section is arched like a goose’s neck and swiveled directly to the motor unit.',
      'Commonly paired with Lowboy and Hotshot trailer configurations.'
    ],
    relatedTerms: ['Lowboy', 'Hotshot', 'Flatbed']
  },

  // ================= H =================
  {
    id: 'hazmat',
    term: 'HAZMAT',
    acronym: 'HAZMAT',
    letter: 'H',
    page: 13,
    category: 'regulation',
    icon: '',
    calloutEs: 'Abbreviation for "hazardous materials"—toxic chemicals, fuels, or biological/radiological agents that pose a risk to health, property, or the environment.',
    definitionEn: 'An abbreviation for “hazardous materials”—substances in quantities or forms that may pose a reasonable risk to health, property, or the environment. HAZMATs include such substances as toxic chemicals, fuels, nuclear waste products, and biological, chemical, and radiological agents. HAZMATs may be released as liquids, solids, gases, or a combination or form of all three, including dust, fumes, gas, vapor, mist, and smoke.',
    explanationEs: 'Materiales Peligrosos: sustancias que por su cantidad o forma representan un riesgo significativo para la salud humana, la propiedad o el entorno durante su almacenamiento o transporte.',
    details: [
      'Includes toxic chemicals, fuels, nuclear waste products, and biological, chemical, and radiological agents.',
      'Release Forms: Liquids, solids, gases, or combinations including dust, fumes, gas, vapor, mist, and smoke.',
      'Requires USDOT registration and specialized safety permits.'
    ],
    relatedTerms: ['Dot number', 'Tankers', 'Federal Motor Carrier Safety Administration (FMCSA)']
  },
  {
    id: 'hopper',
    term: 'Hopper',
    letter: 'H',
    page: 13,
    category: 'equipment',
    icon: '',
    calloutEs: 'Semi-tractor trailer used extensively across the United States to haul bulk agricultural commodities such as grain.',
    definitionEn: 'A trailer pulled by a semi-tractor and used to haul bulk commodity products, such as grain. These trailers are used extensively throughout the United States to transport agricultural products as well as any other commodity that can be hauled in bulk and loaded and unloaded through the trailer.',
    explanationEs: 'Remolque tolva (Hopper bottom): semirremolque diseñado para el transporte de mercancías secas a granel (bulk commodities), especialmente granos y productos agrícolas, permitiendo una carga superior y descarga rápida por gravedad a través de compuertas inferiores.',
    details: [
      'Pulled by a semi-tractor to haul bulk commodity products such as grain.',
      'Used extensively across the United States for agricultural products and bulk commodities.'
    ],
    relatedTerms: ['End Dump Trailer', 'Tankers', 'Trailer']
  },
  {
    id: 'hos',
    term: 'H.O.S',
    acronym: 'H.O.S',
    letter: 'H',
    page: 14,
    category: 'regulation',
    icon: '',
    calloutEs: 'Hours-of-Service: U.S. Department of Transportation (USDOT) safety regulations governing the driving and working hours of interstate commercial drivers.',
    definitionEn: 'Hours-of-Service -- U.S. Department of Transportation safety regulations which govern the hours of service of commercial vehicle drivers engaged in interstate trucking operations.',
    explanationEs: 'Horas de Servicio: normativa federal de seguridad emitida por el USDOT que establece los límites máximos de tiempo de conducción y los periodos obligatorios de descanso para conductores de vehículos comerciales en operaciones interestatales.',
    details: [
      'U.S. Department of Transportation (USDOT) safety regulations governing driving hours in interstate trucking.',
      'Recorded electronically via an ELD attached to the commercial vehicle engine.'
    ],
    relatedTerms: ['ELD', 'Federal Motor Carrier Safety Administration (FMCSA)', 'Driver', 'Layover']
  },
  {
    id: 'hotshot',
    term: 'Hotshot',
    letter: 'H',
    page: 14,
    category: 'equipment',
    icon: '',
    calloutEs: 'Flatbed trailer towed by a medium- or heavy-duty truck (typically Class 3, 4, or 5 like a four-axle RAM 3500) for local, regional, or national deliveries.',
    definitionEn: 'Any flatbed trailer towed by a medium or heavy duty truck that delivers loads to local, regional or national locations. The vehicles are typically midsized-class 3, 4 or 5 trucks with four axles from RAM 3500.',
    explanationEs: 'Modalidad de transporte ágil que combina una camioneta pickup de trabajo mediano/pesado (típicamente Clase 3, 4 o 5, como una RAM 3500) con un remolque de plataforma (flatbed/gooseneck) para entregar cargas urgentes a nivel local, regional o nacional.',
    details: [
      'Flatbed trailer towed by a medium- or heavy-duty truck for local, regional, or national deliveries.',
      'Typical Vehicles: Midsized Class 3, 4, or 5 trucks with four axles (such as a RAM 3500).'
    ],
    relatedTerms: ['Flatbed', 'Gooseneck Trailer', 'Expedited Freight']
  },
  {
    id: 'hubspot',
    term: 'Hubspot',
    letter: 'H',
    page: 14,
    category: 'technology',
    icon: '',
    calloutEs: 'Complete suite of marketing, sales, and customer service tools whose CRM tracks customer interactions, forecasts revenue, and measures team productivity.',
    definitionEn: 'A complete suite of marketing, sales and customer service tools for businesses of all sizes. The CRM product tracks and manages the interactions between a company and its customers and prospects. It enables companies to forecast revenue, measure sales team productivity, and report revenue streams',
    explanationEs: 'Plataforma integral de software empresarial (CRM) para marketing, ventas y atención al cliente. En operaciones comerciales logísticas se emplea para dar seguimiento a clientes y prospectos, proyectar ingresos y evaluar el rendimiento del equipo de ventas.',
    details: [
      'Complete suite of marketing, sales, and customer service tools.',
      'Key Capabilities: Tracks customer and prospect interactions, forecasts revenue, measures sales team productivity, and reports revenue streams.'
    ],
    relatedTerms: ['CRM', 'ITS Dispatch', 'Transportation Management System (TMS)']
  },

  // ================= I =================
  {
    id: 'insurance',
    term: 'Insurance',
    letter: 'I',
    page: 14,
    category: 'regulation',
    icon: '',
    calloutEs: 'System of protection against loss under which parties pay premiums in exchange for guaranteed compensation for specified loss and damage.',
    definitionEn: 'A system of protection against loss under which a number of parties agree to pay certain sums (premiums) for a guarantee that they will be compensated under certain conditions for specified loss and damage.',
    explanationEs: 'Seguro: contrato y mecanismo financiero de protección donde el asegurado paga una suma periódica (prima / premium) a cambio de recibir indemnización económica si ocurren pérdidas o daños cubiertos por la póliza.',
    details: [
      'Parties pay premiums in exchange for guaranteed compensation under specified conditions of loss and damage.',
      'Key logistics insurance types include Cargo Insurance, Liability Insurance, and Automobile Liability Insurance.'
    ],
    relatedTerms: ['Cargo Insurance', 'Liability Insurance', 'Automobile Liability Insurance', 'Certificate Holder']
  },
  {
    id: 'invoice',
    term: 'Invoice',
    letter: 'I',
    page: 14,
    category: 'documents',
    icon: '',
    calloutEs: 'Commercial document issued by the seller to a buyer listing the products or services sold, mode of transport, and payment terms.',
    definitionEn: 'A document listing the products or services sold, mode of transport used to deliver (if the case) and the payment terms. An invoice is issued by the seller to a buyer. In some cases, the buyer has a limited number of days to settle the payment. The buyer could have already paid for the product or services listed, thus, in this case, the invoice acts as a receipt.',
    explanationEs: 'Factura: documento comercial emitido por el prestador del servicio o vendedor hacia el comprador, detallando los bienes o servicios, el medio de transporte utilizado y el plazo para liquidar el pago (o sirviendo como recibo si ya fue pagado).',
    details: [
      'Lists products or services sold, mode of transport used, and payment terms.',
      'Acts as a receipt if the buyer has already paid for the listed products or services.'
    ],
    relatedTerms: ['Commercial Invoice', 'Factoring Company', 'Notice of Assignments', 'Quick pay']
  },
  {
    id: 'its-dispatch',
    term: 'ITS Dispatch',
    letter: 'I',
    page: 15,
    category: 'technology',
    icon: '',
    calloutEs: 'Cloud-based fleet management and brokerage system designed for small-to-midsize fleets and brokers, featuring dispatch, GPS tracking, and rate management.',
    definitionEn: 'A cloud-based fleet management system designed with small to midsize fleets and freight brokerage firms in mind. It features a suite of fleet management applications, including dispatch and scheduling, GPS tracking, freight brokerage, and rates and quote management.',
    explanationEs: 'Software basado en la nube (cloud-based) orientado a pequeñas y medianas flotas de camiones y agencias de freight brokerage. Reúne herramientas para despacho, programación, seguimiento GPS y administración de cotizaciones.',
    details: [
      'Cloud-based fleet management system tailored for small-to-midsize fleets and freight brokerages.',
      'Features: Dispatch and scheduling, GPS tracking, freight brokerage, and rates/quote management.'
    ],
    relatedTerms: ['Transportation Management System (TMS)', 'Truckstop', 'Load Board', 'Dispatcher']
  },

  // ================= L =================
  {
    id: 'lane',
    term: 'Lane',
    letter: 'L',
    page: 15,
    category: 'operations',
    icon: '',
    calloutEs: 'A narrow route, path, or recurring origin-to-destination freight corridor.',
    definitionEn: 'A narrow route or path.',
    explanationEs: 'Corredor o ruta comercial: trayecto específico que conecta un punto de origen con un punto de destino (por ejemplo, Miami a Atlanta) sobre el cual se cotizan tarifas por milla.',
    details: [
      'Defines a specific origin-to-destination corridor along which FTL and LTL shipments are priced.'
    ],
    relatedTerms: ['Backhaul', 'Full Truck Loaded (FTL)', 'Rate']
  },
  {
    id: 'layover',
    term: 'Layover',
    letter: 'L',
    page: 15,
    category: 'operations',
    icon: '',
    calloutEs: 'Occurs when a truck driver is delayed by a shipper or receiver for one or more full days.',
    definitionEn: 'When a driver is delayed by a shipper or receiver for one or more days.',
    explanationEs: 'Estadía o pernocta por demora: situación en la que el conductor se ve obligado a esperar uno o más días completos debido a retrasos imputables al remitente o al destinatario, generando usualmente una compensación económica adicional.',
    details: [
      'Applies when a driver is delayed by a shipper or receiver for one or more full days (whereas Detention covers hourly delays).'
    ],
    relatedTerms: ['Detention', 'Reschedule', 'Appointment']
  },
  {
    id: 'less-than-truckload-ltl',
    term: 'Less Than Truckload (LTL)',
    acronym: 'LTL',
    letter: 'L',
    page: 15,
    category: 'operations',
    icon: '',
    calloutEs: 'Consolidated freight shipment that does not require an entire truck; priced by weight, volume, Freight Class, and mileage across a hub-and-spoke network.',
    definitionEn: 'When a shipper contracts for the transportation of freight that will not require an entire truck. LTL shipments are priced according to the weight and volume of the freight, its freight class, and mileage within designated lanes. An LTL carrier specializes in LTL shipments, and therefore typically operates a complex hub-and spoke network with consolidation/deconsolidation points; LTL carriers carry multiple shipments for different customers in single trucks.',
    explanationEs: 'Carga Consolidada / Menos de un Camión Completo: modalidad en la que el embarcador contrata solo una fracción del espacio del remolque. El transportista LTL agrupa cargas de múltiples clientes en un mismo camión operando una red de terminales (hub-and-spoke).',
    details: [
      'Pricing Factors: Weight and volume of the freight, Freight Class, and mileage within designated lanes.',
      'Network Model: Operates a hub-and-spoke network with consolidation/deconsolidation points carrying multiple customers’ shipments in a single truck.'
    ],
    relatedTerms: ['Full Truck Loaded (FTL)', 'Freight Class', 'Consolidation', 'Expedited Freight']
  },
  {
    id: 'liability-insurance',
    term: 'Liability Insurance',
    letter: 'L',
    page: 15,
    category: 'regulation',
    icon: '',
    calloutEs: 'Policy protecting the insured against claims resulting from injuries and damage to people or property, covering both legal defense costs and payouts.',
    definitionEn: 'Provides the insured party with protection against claims resulting from injuries and damage to people or property. Liability insurance policies cover both legal costs and any payouts for which the insured party would be responsible if found legally liable. Intentional damage and contractual liabilities are generally not covered in these types of policies.',
    explanationEs: 'Seguro de Responsabilidad Civil: protege al asegurado frente a reclamaciones de terceros por lesiones personales o daños materiales. Cubre los gastos de defensa legal y los pagos de indemnización si el asegurado resulta legalmente responsable.',
    details: [
      'Covers both legal defense costs and payouts if the insured party is found legally liable.',
      'Exclusions: Intentional damage and contractual liabilities are generally not covered.'
    ],
    relatedTerms: ['Automobile Liability Insurance', 'Cargo Insurance', 'Insurance', 'Certificate Holder']
  },
  {
    id: 'live-load',
    term: 'Live Load',
    letter: 'L',
    page: 16,
    category: 'operations',
    icon: '',
    calloutEs: 'Loading or unloading operation performed within a short timeframe while the driver of the truck or trailer waits on-site.',
    definitionEn: 'When you are forced to load or unload your items in short period of time, often while the driver of the truck or trailer waits. A live load is common for storage containers and moving trailers in big cities, like New York City, Seattle and Chicago, where parking is limited. A live load is almost always required for international shipping containers, regardless of the location.',
    explanationEs: 'Carga en vivo: operación donde el camión llega al muelle y el conductor permanece esperando mientras el personal carga o descarga el remolque (a diferencia de "Drop and Hook", donde se deja el remolque).',
    details: [
      'Loading or unloading takes place while the truck driver waits on-site.',
      'Common in major cities with limited parking (such as New York City, Seattle, and Chicago) and almost always required for international shipping containers.'
    ],
    relatedTerms: ['Detention', 'Loading Dock', 'Lumper']
  },
  {
    id: 'load-board',
    term: 'Load Board',
    letter: 'L',
    page: 16,
    category: 'technology',
    icon: '',
    calloutEs: 'Online matching system where shippers and freight brokers post loads and carriers post available equipment to enter into freight agreements.',
    definitionEn: 'Online matching systems that allow shippers and freight brokers to post loads. They also allow carriers to post their free equipment. These systems allow shippers and carriers to find each other and enter into agreements to move freight. Most trucking load boards are sophisticated and allow you to post and search for loads using a number of criteria. Additionally, they provide various services for both freight brokers and carriers',
    explanationEs: 'Bolsa de cargas: plataforma digital (marketplace) donde los agentes de carga y embarcadores publican envíos pendientes y los transportistas anuncian sus camiones disponibles, permitiendo buscar, filtrar y negociar fletes en tiempo real.',
    details: [
      'Online matching system where shippers/brokers post loads and carriers post available equipment.',
      'Supports multi-criteria search and additional value-added services for brokers and carriers.'
    ],
    relatedTerms: ['Truckstop', 'Bidding', 'Freight Broker', 'Dispatching']
  },
  {
    id: 'load-bar',
    term: 'Load Bar',
    letter: 'L',
    page: 16,
    category: 'equipment',
    icon: '',
    calloutEs: 'Cargo bar used by semi-truck and pickup drivers to safely secure loads inside the trailer and prevent load shift.',
    definitionEn: 'Used by semi-truck and pickup drivers for years to safely secure their loads and prevent load shift. As these drivers look for new and innovative ways to protect themselves and their cargo, a variety of different cargo bars have been developed.',
    explanationEs: 'Barra estabilizadora de carga (cargo bar): barra ajustable de acero o aluminio que se fija a presión o en rieles entre las paredes internas del remolque para inmovilizar los pallets y prevenir que la carga se desplace (load shift) durante el frenado o las curvas.',
    details: [
      'Used by semi-truck and pickup drivers to safely secure cargo and prevent load shift.'
    ],
    relatedTerms: ['Straps', 'Dry Van', 'Reefer', 'Pallet']
  },
  {
    id: 'loading-dock',
    term: 'Loading Dock',
    letter: 'L',
    page: 16,
    category: 'operations',
    icon: '',
    calloutEs: 'Area of a commercial, industrial, or warehouse building where road or rail goods vehicles are loaded and unloaded.',
    definitionEn: "An area of a building where goods vehicles (usually road or rail) are loaded and unloaded. They are commonly found on commercial and industrial buildings, and warehouses in particular. Loading docks are part of a facility's service or utility infrastructure, typically providing direct access to staging areas, storage rooms, and freight elevators.",
    explanationEs: 'Muelle o andén de carga: zona estructural de un almacén o planta industrial diseñada a la altura de la caja del camión o vagón para facilitar la entrada y salida de mercancías mediante montacargas.',
    details: [
      'Provides direct access to staging areas, storage rooms, and freight elevators in warehouses and industrial buildings.'
    ],
    relatedTerms: ['Warehouse', 'Cross Dock', 'Fork lift', 'Live Load']
  },
  {
    id: 'logistics-manager',
    term: 'Logistics Manager',
    letter: 'L',
    page: 16,
    category: 'roles',
    icon: '',
    calloutEs: 'Also known as a Supply Chain Manager; supervises the movement, distribution, route planning, budgeting, and storage of supplies and materials.',
    definitionEn: 'Supervises the movement, distribution and storage of supplies and materials in a company. They are tasked with planning routes, analyzing budgets, and processing shipments. Also known as Supply Chain Managers, they generally form part of middle management. They determine how an organization should purchase products and how they should distribute them. The broad nature of this role means that logistics managers need strong organization and multitasking skills.',
    explanationEs: 'Gerente de Logística (o Gerente de Cadena de Suministro): directivo de mando medio responsable de planificar rutas, analizar presupuestos, procesar envíos y definir cómo la organización adquiere y distribuye sus productos.',
    details: [
      'Also known as Supply Chain Manager (typically part of middle management).',
      'Responsibilities: Route planning, budget analysis, shipment processing, and overseeing product purchasing and distribution.'
    ],
    relatedTerms: ['Transportation Manager', 'Supply chain', 'Gatekeeper']
  },
  {
    id: 'lowboy',
    term: 'Lowboy',
    letter: 'L',
    page: 16,
    category: 'equipment',
    icon: '',
    calloutEs: 'Semi-trailer with two drops in deck height (after the gooseneck and before the wheels) capable of carrying legal heavy loads up to 12 ft (3.66 m) tall.',
    definitionEn: 'A semi-trailer with two drops in deck height: one right after the gooseneck and one right before the wheels. This allows the deck to be extremely low compared with other trailers. It offers the ability to carry legal loads up to 12 ft (3.66 m) tall, which other trailers cannot. Lowboys are used to haul heavy equipment such as bulldozers, industrial equipment, etc.',
    explanationEs: 'Remolque de cama baja (Lowboy): semirremolque especializado con doble desnivel (uno justo después del cuello de ganso y otro antes de las ruedas traseras), situando la plataforma sumamente cerca del suelo para transportar maquinaria extra alta.',
    details: [
      'Two drops in deck height: One right after the gooseneck and one right before the wheels.',
      'Maximum Legal Load Height: Up to 12 ft (3.66 m) tall.',
      'Typical Cargo: Heavy equipment such as bulldozers and industrial machinery.'
    ],
    relatedTerms: ['Dropdeck Trailer', 'Flatbed', 'Gooseneck Trailer']
  },
  {
    id: 'lumper',
    term: 'Lumper',
    letter: 'L',
    page: 17,
    category: 'roles',
    icon: '',
    calloutEs: 'Third-party workers hired by the shipper or receiver (especially at food warehouses) to load or unload freight from the trailer while the driver rests.',
    definitionEn: 'When a carrier arrives to be loaded or unloaded, they may be charged with a lumper service. A lumper service, is when the shipper or receiver hires third-party workers to help load or unload the freight from the trailer and is more common with food warehousing companies. Lumper services are meant to save truck drivers time and give them the ability to rest while their trailer is unloaded',
    explanationEs: 'Servicio de estibadores o descargadores externos: personal de una empresa externa contratado en las instalaciones del cliente para realizar físicamente la carga o descarga del camión, permitiendo al conductor descansar y ahorrar tiempo.',
    details: [
      'Third-party workers hired by the shipper or receiver to load or unload freight from a trailer.',
      'Most common at food warehousing companies; saves drivers time and allows them to rest during unloading.'
    ],
    relatedTerms: ['Lumper Fee', 'Loading Dock', 'Driver', 'Warehouse']
  },
  {
    id: 'lumper-fee',
    term: 'Lumper Fee',
    letter: 'L',
    page: 17,
    category: 'finance',
    icon: '',
    calloutEs: 'Fee charged to the carrier when a warehouse uses third-party workers (lumpers) to load or unload trailer contents; typically reimbursable by the shipper or broker.',
    definitionEn: 'Charged to the carrier when a shipper utilizes third-party workers to help load or unload the trailer contents. Lumpers are often used at food warehousing companies and grocery distributors. These fees are often reimbursable to the driver by the shipper or the freight broker.',
    explanationEs: 'Cargo por servicio de descarga (Lumper): tarifa que paga el transportista en el muelle cuando el centro de distribución emplea cuadrillas externas para descargar el remolque. Generalmente es reembolsado al conductor o carrier por el broker o shipper contra entrega del recibo.',
    details: [
      'Charged to the carrier when third-party lumper workers load or unload trailer contents.',
      'Common at food warehouses and grocery distributors; typically reimbursable to the driver by the shipper or freight broker.'
    ],
    relatedTerms: ['Lumper', 'Comcheck', 'Detention']
  },

  // ================= M =================
  {
    id: 'manufacturer',
    term: 'Manufacturer',
    letter: 'M',
    page: 17,
    category: 'roles',
    icon: '',
    calloutEs: 'Entity or producer that makes a good on a large scale through a process involving raw materials, components, or assemblies.',
    definitionEn: 'Entity that makes a good through a process involving raw materials, components, or assemblies, usually on a large scale with different operations divided among different workers. Commonly used interchangeably with producer.',
    explanationEs: 'Fabricante o productor: empresa industrial que transforma materias primas o piezas en productos terminados a gran escala, originando gran parte de la demanda de transporte en la cadena de suministro.',
    details: [
      'Commonly used interchangeably with "producer".',
      'Produces goods on a large scale from raw materials, components, or assemblies.'
    ],
    relatedTerms: ['Distributor', 'Supply chain', 'Shipper']
  },
  {
    id: 'mc-number',
    term: 'MC Number',
    acronym: 'MC',
    letter: 'M',
    page: 17,
    category: 'regulation',
    icon: '',
    calloutEs: 'Motor Carrier Number: interstate operating authority and unique identifier assigned by the FMCSA to companies hauling cargo across state lines.',
    definitionEn: 'An interstate operating authority and unique identifier assigned by the FMCSA to moving companies operating in interstate commerce, in other words hauling cargo across state lines. However, while all interstate movers are required to have and display a USDOT number on their commercial carriers, not all moving companies doing Intrastate loads need an MC number.',
    explanationEs: 'Número MC (Autoridad Operativa): código único otorgado por la FMCSA que autoriza legalmente a una empresa de transporte a mover carga remunerada a través de las fronteras estatales (comercio interestatal).',
    details: [
      'Interstate operating authority and unique identifier assigned by the FMCSA for hauling cargo across state lines.',
      'While all interstate carriers must display a USDOT number, carriers performing strictly intrastate loads do not always require an MC number.'
    ],
    relatedTerms: ['Dot number', 'Federal Motor Carrier Safety Administration (FMCSA)', 'Carrier Package']
  },

  // ================= N =================
  {
    id: 'notice-of-assignments',
    term: 'Notice of Assignments',
    acronym: 'NOA',
    letter: 'N',
    page: 17,
    category: 'finance',
    icon: '',
    calloutEs: 'Official letter sent by a factoring company notifying customers that accounts receivable have been assigned and future payments must go to the factor.',
    definitionEn: 'A letter that the factoring will send to you from the customers whose invoices you are factoring. The notice informs that the accounts receivables have been assigned and future payments should be made payable to the factoring company.',
    explanationEs: 'Aviso de Cesión (NOA): notificación legal emitida por una empresa de factoraje (Factoring Company) que informa al broker o cliente que las facturas del transportista han sido cedidas y que todo pago futuro debe realizarse a nombre de la compañía de factoraje.',
    details: [
      'Official letter sent by a Factoring Company notifying that accounts receivable have been assigned and future payments must be made payable to the factoring company.'
    ],
    relatedTerms: ['Factoring Company', 'Invoice', 'Quick pay']
  },

  // ================= O =================
  {
    id: 'overweight',
    term: 'Overweight',
    letter: 'O',
    page: 18,
    category: 'regulation',
    icon: '',
    calloutEs: 'Federal interstate maximum weight regulations: 80,000 lbs gross vehicle weight, 20,000 lbs single axle, and 34,000 lbs tandem axle.',
    definitionEn: 'The following are the Federally mandated maximum weights for the National System of Interstate and Defense Highways: 80,000-pound gross vehicle weight, 20,000-pounds single axle weight, 34,000-pound tandem axle weight. Axle spacing is another consideration that must be taken into account when looking at Federal weight compliance. To protect bridges, the number and spacing of axles carrying the vehicle load must be calculated. Thus, a bridge weight formula is also applied to commercial vehicles in determining their compliance with Federal weight limits. The Federal bridge formula applies when the gross weight on two or more consecutive axles exceeds the limitations of the formula, except that two consecutive sets of tandem axles may carry a gross load of 34,000 pounds each if the overall distance between the first and last axle is 36 feet or more. The Federal government does not issue permits for oversize or overweight vehicles. This is a State option. Usually a flatbed can haul up to 48000 pounds, a dry van up to 45,000 pounds and a reefer up to 43,000 pounds.',
    explanationEs: 'Sobrepeso y límites federales de peso: conjunto de normas que fijan el peso máximo permitido en el Sistema Nacional de Autopistas Interestatales y de Defensa de EE. UU., incluyendo la Fórmula Federal de Puentes (Federal Bridge Formula) y las capacidades por tipo de remolque.',
    details: [
      'Federally Mandated Maximum Weights (Interstate Highways):',
      '• Gross Vehicle Weight: 80,000 lbs.',
      '• Single Axle Weight: 20,000 lbs.',
      '• Tandem Axle Weight: 34,000 lbs (two consecutive sets of tandem axles may carry 34,000 lbs each if the overall distance between the first and last axle is 36 ft or more).',
      'Permits: The Federal government does not issue oversize/overweight permits; permits are a State option.',
      'Typical Payload Limits by Trailer Type: Flatbed up to 48,000 lbs, Dry Van up to 45,000 lbs, and Reefer up to 43,000 lbs.'
    ],
    relatedTerms: ['Scale Ticket', 'Pounds', 'Flatbed', 'Dry Van', 'Reefer']
  },
  {
    id: 'owner-operator',
    term: 'Owner Operator',
    letter: 'O',
    page: 18,
    category: 'roles',
    icon: '',
    calloutEs: 'Self-employed commercial truck driver or small business operating its own trucks either freelance or under a dedicated lease agreement.',
    definitionEn: 'A self-employed commercial truck driver or a small business that operates trucks for transporting goods over highways for its customers. An owner-operator is free to either haul free-lance, or enter into a lease agreement to dedicate their equipment to one customer or product. The owner-operator typically has to pay higher rates on insurance due to smaller size than most larger companies, meaning they have to charge more to balance the cost.',
    explanationEs: 'Propietario-Operador: camionero autónomo o microempresa propietaria de su propio camión comercial. Puede operar de forma independiente en el mercado abierto o firmar un contrato de arrendamiento (lease agreement) dedicando su equipo a un cliente.',
    details: [
      'Self-employed commercial truck driver or small business operating its own trucks.',
      'Can haul freelance or enter into a lease agreement dedicating equipment to one customer.',
      'Typically pays higher insurance rates due to smaller fleet size compared to large carriers.'
    ],
    relatedTerms: ['Asset Based Carrier', 'Driver', 'Dispatching', 'Insurance']
  },

  // ================= P =================
  {
    id: 'pallet',
    term: 'Pallet',
    letter: 'P',
    page: 18,
    category: 'equipment',
    icon: '',
    calloutEs: 'Small platform (usually 40x48 inches) on which goods are placed for grouping break-bulk cargo and handling within a warehouse or vehicle.',
    definitionEn: 'A small platform, 40x48 inches usually, on which goods are placed for handling within a warehouse or a transportation vehicle such as a ship. Good for grouping break-bulk cargo for handling.',
    explanationEs: 'Tarima o paleta: base estructural plana (el estándar norteamericano es de 40 x 48 pulgadas) donde se apila la mercancía para facilitar su levantamiento y transporte mediante montacargas o patines hidráulicos.',
    details: [
      'Standard Dimensions: Typically 40 x 48 inches.',
      'Used for grouping break-bulk cargo for efficient handling inside warehouses and transport vehicles.'
    ],
    relatedTerms: ['Palletization', 'Fork lift', 'Dry Van', 'Warehouse']
  },
  {
    id: 'palletization',
    term: 'Palletization',
    letter: 'P',
    page: 18,
    category: 'operations',
    icon: '',
    calloutEs: 'Method of storing and transporting goods stacked on a pallet and shipped as a standardized unit load handled with forklift trucks.',
    definitionEn: 'Method of storing and transporting goods stacked on a pallet, and shipped as a unit load. It permits standardized ways of handling loads with common mechanical equipment such as fork-lift trucks.',
    explanationEs: 'Paletización: proceso logístico de estibar y asegurar cajas o productos sobre una tarima (pallet) para conformar una sola unidad de carga compacta, permitiendo su manejo estandarizado con equipos mecánicos como montacargas.',
    details: [
      'Stacks goods on a pallet to be shipped as a standardized "unit load".',
      'Enables standardized handling using common mechanical equipment such as fork-lift trucks.'
    ],
    relatedTerms: ['Pallet', 'Fork lift', 'Packers', 'Warehouse']
  },
  {
    id: 'packers',
    term: 'Packers',
    letter: 'P',
    page: 19,
    category: 'roles',
    icon: '',
    calloutEs: 'Person, company, or machine that puts goods into boxes or food into containers.',
    definitionEn: 'A person, company, or machine that puts goods into boxes or food into containers',
    explanationEs: 'Empacadores: operarios, compañías especializadas o sistemas automatizados cuya función es embalar productos en cajas o envasar alimentos en contenedores listos para su despacho.',
    details: [
      'Refers to a person, company, or machine that packs goods into boxes or food into containers.'
    ],
    relatedTerms: ['Palletization', 'Warehouse', 'Parcel Shipment']
  },
  {
    id: 'parcel-shipment',
    term: 'Parcel Shipment',
    letter: 'P',
    page: 19,
    category: 'operations',
    icon: '',
    calloutEs: 'Small package shipments like those typically handled by parcel carriers such as UPS and FedEx.',
    definitionEn: 'Small packages like those typically handled by providers such as UPS and FedEx.',
    explanationEs: 'Envío de paquetería (Parcel): modalidad de transporte enfocada en cajas y paquetes individuales de pequeño tamaño y peso, operada típicamente por empresas de mensajería como UPS y FedEx.',
    details: [
      'Covers small individual packages typically handled by parcel carriers such as UPS and FedEx.'
    ],
    relatedTerms: ['Less Than Truckload (LTL)', 'Full Truck Loaded (FTL)', 'Delivery']
  },
  {
    id: 'pick-up',
    term: 'Pick up',
    letter: 'P',
    page: 19,
    category: 'operations',
    icon: '',
    calloutEs: 'Going to the origin location where freight is waiting to be collected and taking it away for transport.',
    definitionEn: 'When you pick up someone or something that is waiting to be collected, you go to the place where they are and take them away.',
    explanationEs: 'Recolección o recogida: etapa inicial del tránsito en la que el transportista acude a las instalaciones del remitente (shipper) para cargar y retirar la mercancía programada.',
    details: [
      'Initial collection of freight at the origin location prior to transit and Delivery.'
    ],
    relatedTerms: ['Delivery', 'Appointment', 'Cash on Pick up (COP)', 'Shipper']
  },
  {
    id: 'pod-proof-of-delivery',
    term: 'P.O.D (Proof of Delivery)',
    acronym: 'P.O.D',
    letter: 'P',
    page: 19,
    category: 'documents',
    icon: '',
    calloutEs: 'Document signed by the recipient confirming successful delivery of goods (or documenting loss/damages); the BOL becomes a POD once signed by the receiver.',
    definitionEn: 'A document signed by the recipient to confirm the delivery of goods in a good condition. By releasing a POD, the customer knows that his goods were delivered successfully. The POD can also be used to document loss or damages. As an important document, POD prevents misunderstandings between the customers and businesses so, it saves time. The BOL becomes a POD when is get signed by the receiver.',
    explanationEs: 'Prueba de Entrega (Proof of Delivery): comprobante firmado por el receptor en destino que certifica que los bienes fueron entregados satisfactoriamente (o deja constancia escrita si hubo averías o faltantes).',
    details: [
      'Signed by the recipient to confirm successful delivery in good condition (or to document loss/damages).',
      'Key Rule: The BOL (Bill of Lading) becomes a POD once it is signed by the receiver.'
    ],
    relatedTerms: ['Freight bill-of-lading (BOL)', 'Clean Bill', 'Consignee', 'Claim']
  },
  {
    id: 'po-number-purchase-order-number',
    term: 'P.O Number (Purchase Order Number)',
    acronym: 'P.O',
    letter: 'P',
    page: 19,
    category: 'documents',
    icon: '',
    calloutEs: 'Purchase Order Number: purchaser\'s physical or electronic authorization code used to formalize a purchase transaction with a supplier.',
    definitionEn: "The purchaser's authorization used to formalize a purchase transaction with a supplier. The physical form or electronic transaction a buyer uses when placing an order for merchandise.",
    explanationEs: 'Número de Orden de Compra: código único de referencia generado por el comprador al realizar un pedido a un proveedor (tanto en formato físico como electrónico) para autorizar y rastrear la transacción comercial.',
    details: [
      'Purchaser’s authorization code (physical or electronic) used to formalize a merchandise order with a supplier.'
    ],
    relatedTerms: ['Commercial Invoice', 'Invoice', 'Appointment']
  },
  {
    id: 'pounds',
    term: 'Pounds',
    acronym: 'lb',
    letter: 'P',
    page: 19,
    category: 'operations',
    icon: '',
    calloutEs: 'Imperial and U.S. customary unit of mass (symbol: lb); the international avoirdupois pound is legally defined as exactly 0.45359237 kilograms.',
    definitionEn: 'A unit of mass used in the imperial, United States customary and other systems of measurement. Various definitions have been used; the most common today is the international avoirdupois pound, which is legally defined as exactly 0.45359237 kilograms. The international standard symbol for the avoirdupois pound is lb.',
    explanationEs: 'Libras (lb): unidad fundamental de peso en el transporte de carga en Estados Unidos. Se basa en la libra internacional avoirdupois, definida exactamente como 0.45359237 kg.',
    details: [
      'Exact Legal Definition: 1 international avoirdupois pound = 0.45359237 kilograms.',
      'International Standard Symbol: lb.'
    ],
    relatedTerms: ['Overweight', 'Scale Ticket', 'Dry Van', 'Flatbed']
  },
  {
    id: 'prepaid',
    term: 'Prepaid',
    letter: 'P',
    page: 19,
    category: 'finance',
    icon: '',
    calloutEs: 'Refers to the total transport cost (or a portion of it) that the shipper must cover prior to shipping.',
    definitionEn: 'Refers to the total transport cost or a portion the shipper has to cover before shipping.',
    explanationEs: 'Prepagado: condición de pago del flete en la cual el remitente (shipper) liquida la totalidad o una parte acordada de los cargos de transporte antes de que la mercancía sea despachada.',
    details: [
      'Total transport cost (or a portion) covered by the shipper prior to shipping.',
      'Contrasts with Cash on Delivery (COD).'
    ],
    relatedTerms: ['Cash on Delivery (COD)', 'Cash on Pick up (COP)', 'Shipper']
  },

  // ================= Q =================
  {
    id: 'quick-pay',
    term: 'Quick pay',
    letter: 'Q',
    page: 19,
    category: 'finance',
    icon: '',
    calloutEs: 'Financing option where a broker advances invoice payment to a trucking company within 1 to 7 days after delivery in exchange for a small fee.',
    definitionEn: 'When a broker advances the trucking company for an invoice in exchange for a small fee. In addition, most brokers can get the trucking company paid anywhere from 1-7 days after the load is delivered.',
    explanationEs: 'Pago rápido: servicio financiero ofrecido directamente por el Freight Broker mediante el cual liquida la factura del transportista de forma acelerada (entre 1 y 7 días después de entregada la carga) a cambio de un pequeño porcentaje de descuento.',
    details: [
      'Payment Timeline: Typically 1 to 7 days after the load is delivered.',
      'Fee Structure: The broker advances payment on the invoice in exchange for a small fee.'
    ],
    relatedTerms: ['Factoring Company', 'ACH', 'Comcheck', 'Invoice']
  },

  // ================= R =================
  {
    id: 'rate',
    term: 'Rate',
    letter: 'R',
    page: 19,
    category: 'finance',
    icon: '',
    calloutEs: 'Price at which cargo is delivered from one point to another, determined by cargo form, transport mode, market conditions, weight, and distance.',
    definitionEn: 'A price at which a certain cargo is delivered from one point to another. The price depends on the form of the cargo, the mode of transport (truck, ship, train, aircraft), the market conditions, the weight of the cargo, and the distance to the delivery destination.',
    explanationEs: 'Tarifa de flete: precio acordado para trasladar un envío desde el origen hasta el destino.',
    details: [
      'Five factors determining the Rate:',
      '1. Form of the cargo.',
      '2. Mode of transport (truck, ship, train, aircraft).',
      '3. Market conditions.',
      '4. Weight of the cargo.',
      '5. Distance to the delivery destination.'
    ],
    relatedTerms: ['Rate Confirmation', 'Spot Rate', 'Tariff', 'Bidding']
  },
  {
    id: 'rate-confirmation',
    term: 'Rate Confirmation',
    letter: 'R',
    page: 19,
    category: 'documents',
    icon: '',
    calloutEs: 'Legally binding agreement between the freight broker and the carrier containing all load details; must be signed by the carrier before proceeding.',
    definitionEn: 'An agreement between the freight broker and carrier that is legally binding that contains all the details about the load. A freight broker must provide a rate confirmation for the carrier to sign before proceeding.',
    explanationEs: 'Confirmación de Tarifa (conocida coloquialmente como "Rate Con"): contrato específico por viaje entre el broker y el transportista que detalla el pago acordado, direcciones, citas, peso y requerimientos especiales.',
    details: [
      'Legally binding agreement between the freight broker and the carrier containing all load details.',
      'Must be provided by the broker and signed by the carrier before proceeding with the load.'
    ],
    relatedTerms: ['Rate', 'Freight Broker', 'Carrier', 'Freight bill-of-lading (BOL)']
  },
  {
    id: 'receiver',
    term: 'Receiver',
    letter: 'R',
    page: 20,
    category: 'roles',
    icon: '',
    calloutEs: 'Individual or firm to whom freight is shipped; a freight receiver (synonymous with Consignee).',
    definitionEn: 'An individual or firm to whom freight is shipped. A freight receiver.',
    explanationEs: 'Receptor: persona física o moral que recibe la mercancía en las instalaciones de destino. Comparte exactamente la misma definición operativa que Consignee.',
    details: [
      'Individual or firm to whom freight is shipped (synonymous with Consignee).'
    ],
    relatedTerms: ['Consignee', 'Shipper', 'P.O.D (Proof of Delivery)']
  },
  {
    id: 'reefer',
    term: 'Reefer',
    letter: 'R',
    page: 20,
    category: 'equipment',
    icon: '',
    calloutEs: 'Refrigerated truck or trailer equipped with a thermostat and cooling unit powered by diesel generators and liquid CO2 to haul perishable goods.',
    definitionEn: "A truck or trailer which has a refrigeration unit and a thermostat. It's refrigerated by diesel-powered generators and liquid carbon dioxide, or CO2. Reefer trucks range from simple ice cream trucks to large containers carrying perishable goods across the country.",
    explanationEs: 'Remolque refrigerado (Reefer): unidad cerrada con aislamiento térmico, unidad de enfriamiento propia y termostato para mantener temperaturas controladas en el traslado de alimentos, fármacos y perecederos.',
    details: [
      'Equipped with a refrigeration unit and thermostat powered by diesel generators and liquid carbon dioxide (CO2).',
      'Used to haul perishable goods across the country (typical weight limit up to 43,000 lbs).'
    ],
    relatedTerms: ['Temperature Recorder or Data Logger', 'Fahrenheit', 'Dry Van', 'Vented Van']
  },
  {
    id: 'reschedule',
    term: 'Reschedule',
    letter: 'R',
    page: 20,
    category: 'operations',
    icon: '',
    calloutEs: 'To schedule or plan a pickup or delivery appointment again according to a revised timeline.',
    definitionEn: 'To schedule or plan again according to a different timeline.',
    explanationEs: 'Reprogramar: modificar la fecha u hora de una cita de recolección o entrega previamente pactada cuando surgen imprevistos operativos o retrasos en ruta.',
    details: [
      'Scheduling or planning a pickup or delivery appointment again according to a revised timeline.'
    ],
    relatedTerms: ['Appointment', 'Estimated time of arrival (ETA)', 'Layover']
  },

  // ================= S =================
  {
    id: 'safety-rating',
    term: 'Safety Rating',
    letter: 'S',
    page: 20,
    category: 'regulation',
    icon: '',
    calloutEs: 'Official carrier safety summary compiling the 5 most recent investigations and 24 months of roadside inspections and crash history.',
    definitionEn: 'A summary that includes information on the 5 most recent investigations and 24 months of inspections and crash history of a carrier company.',
    explanationEs: 'Calificación de Seguridad: reporte evaluativo de una empresa transportista que consolida sus últimas 5 investigaciones y el historial de inspecciones en carretera y accidentes durante los últimos 24 meses.',
    details: [
      'Includes information on the 5 most recent investigations.',
      'Covers 24 months of inspections and crash history of a carrier company.'
    ],
    relatedTerms: ['Federal Motor Carrier Safety Administration (FMCSA)', 'Dot number', 'MC Number']
  },
  {
    id: 'scale-ticket',
    term: 'Scale Ticket',
    letter: 'S',
    page: 20,
    category: 'documents',
    icon: '',
    calloutEs: 'Weigh station ticket used to keep track of the total weight of a truck\'s contents and the weight distribution across each axle.',
    definitionEn: "Used to keep track of the weight of a truck's contents and the weight distribution in each of the truck axles.",
    explanationEs: 'Ticket de pesaje o báscula: comprobante impreso o digital emitido en una báscula certificada que muestra el peso bruto y cuánto peso recae sobre cada eje del camión para verificar el cumplimiento legal.',
    details: [
      'Tracks both the total weight of a truck’s contents and the weight distribution across each axle.'
    ],
    relatedTerms: ['Overweight', 'Pounds', 'Truck']
  },
  {
    id: 'scac-standard-carrier-alpha-code',
    term: 'SCAC (Standard Carrier Alpha Code)',
    acronym: 'SCAC',
    letter: 'S',
    page: 20,
    category: 'regulation',
    icon: '',
    calloutEs: 'Standard Carrier Alpha Code developed by the NMFTA in the 1960s to identify road transport companies and computerize their records.',
    definitionEn: "A code used to identify transportation companies. It was developed by The National Motor Freight Traffic Association in the 1960s to help computerize road transport companies’ records and data.",
    explanationEs: 'Código Estándar Alfabético de Transportista: código único de identificación (usualmente de 2 a 4 letras) creado en los años 60 por la NMFTA para estandarizar e informatizar los datos y registros de las compañías de autotransporte.',
    details: [
      'Developed by the National Motor Freight Traffic Association (NMFTA) in the 1960s to computerize road transport records.',
      'Included as a required document in the Shipper Package.'
    ],
    relatedTerms: ['Shipper Package', 'Freight Class', 'Carrier']
  },
  {
    id: 'security-seal',
    term: 'Security Seal',
    letter: 'S',
    page: 20,
    category: 'equipment',
    icon: '',
    calloutEs: 'Tamper-evident mechanism used to seal trailers and shipping containers in transit to help detect accidental or deliberate theft or contamination.',
    definitionEn: 'Tamper evident mechanisms used to seal cargo in transit shipping containers in a way that provides tamper evidence and some level of security. Such seals can help to detect theft or contamination, either accidental or deliberate. Security seals are commonly used to secure truck trailers, vessel containers, chemical drums, airline duty-free trolleys, and utility meters. Typically, they are considered an inexpensive way of providing tamper evidence of intrusion into sensitive spaces.',
    explanationEs: 'Sello o precinto de seguridad: dispositivo numerado que se coloca en las puertas cerradas del remolque o contenedor. Si alguien intenta abrir las puertas en tránsito, el sello se rompe dejando evidencia inmediata de intrusión.',
    details: [
      'Tamper-evident mechanism used to detect accidental or deliberate theft or contamination.',
      'Common Applications: Truck trailers, vessel containers, chemical drums, airline duty-free trolleys, and utility meters.'
    ],
    relatedTerms: ['Dry Van', 'Reefer', 'Clean Bill', 'Claim']
  },
  {
    id: 'shipper',
    term: 'Shipper',
    letter: 'S',
    page: 21,
    category: 'roles',
    icon: '',
    calloutEs: 'Person or company (also known as a consignor) responsible for organizing and transporting goods from one point to another, generally bearing the freight cost.',
    definitionEn: 'A person or a company (also known as a consignor) responsible for organizing and transporting goods from one point to another. Generally, the shipper bears the cost of freight, except otherwise stated in the transport contract before shipment',
    explanationEs: 'Embarcador o remitente: cliente propietario o generador de la carga que requiere trasladar productos de un punto a otro. Por regla general asume el pago del flete, salvo que el contrato estipule lo contrario antes del envío.',
    details: [
      'Also known as a Consignor.',
      'Generally bears the cost of freight unless otherwise stated in the transport contract prior to shipment.'
    ],
    relatedTerms: ['Consignor', 'Shipper Package', 'Freight Broker', 'Consignee']
  },
  {
    id: 'shipper-package',
    term: 'Shipper Package',
    letter: 'S',
    page: 21,
    category: 'documents',
    icon: '',
    calloutEs: 'Registration package containing Certificate of Liability Insurance, SCAC Certificate, Shippers Account Application, and Tax ID (W9).',
    definitionEn: 'A package that contents: Certificate of Liability Insurance, Certificate of Standard Carrier Alpha Code, Shippers Account Application, Tax Identification Number (W9). The above documents are requested from the transport company for their formal registration in our system.',
    explanationEs: 'Expediente documental requerido para el alta formal de la cuenta en el sistema, compuesto por cuatro documentos legales y fiscales.',
    details: [
      'Contains four required registration documents:',
      '1. Certificate of Liability Insurance.',
      '2. Certificate of Standard Carrier Alpha Code (SCAC).',
      '3. Shippers Account Application.',
      '4. Tax Identification Number (W9).'
    ],
    relatedTerms: ['Carrier Package', 'SCAC (Standard Carrier Alpha Code)', 'W9', 'Shipper']
  },
  {
    id: 'spot-rate',
    term: 'Spot Rate',
    letter: 'S',
    page: 21,
    category: 'finance',
    icon: '',
    calloutEs: 'Price quoted for immediate settlement ("spot price") reflecting real-time market supply and demand at the exact moment of the quote.',
    definitionEn: 'The price quoted for immediate settlement on a commodity, a security or a currency. The spot rate, also referred to as the "spot price," is the current market value of an asset at the moment of the quote. This value is in turn based on how much buyers are willing to pay and how much sellers are willing to accept, which usually depends on a blend of factors including current market value and expected future market value. The spot rate reflects the supply and demand for an asset in the market. As a result, spot rates change frequently and may sometimes swing dramatically, particularly if significant events occur or there is relevant headline news.',
    explanationEs: 'Tarifa Spot (o precio al contado): tarifa de mercado cotizada en el momento para mover una carga de forma inmediata (fuera de una tarifa de contrato fijo). Refleja el equilibrio instantáneo entre oferta de camiones y demanda de cargas, por lo que fluctúa constantemente.',
    details: [
      'Also referred to as the "spot price" — reflects current market value at the exact moment of the quote.',
      'Driven by real-time supply and demand and may swing dramatically when significant market events occur.'
    ],
    relatedTerms: ['Rate', 'Bidding', 'Tariff', 'Load Board']
  },
  {
    id: 'straps',
    term: 'Straps',
    letter: 'S',
    page: 21,
    category: 'equipment',
    icon: '',
    calloutEs: 'Narrow flat flexible strips or bands applied manually or by machine and pulled taut around products to secure, hold together, or wrap cargo.',
    definitionEn: 'A narrow usually flat strip or thong of a flexible material and especially leather used for securing, holding together, or wrapping. Strapping is applied either manually with a hand tool or automatically with a strapping machine. In both cases, a strap or band is feed around the product and pulled taught. A fastening method then secures the ends of the strap around the product and the excess material is removed. Strapping materials are available in many different strengths with specific grades and classifications.',
    explanationEs: 'Correas, bandas o flejes de sujeción: tiras resistentes y flexibles utilizadas tanto para flejar mercancía sobre pallets como para amarrar cargas sobre remolques Flatbed o dentro de cajas secas.',
    details: [
      'Applied either manually with a hand tool or automatically with a strapping machine.',
      'Available in multiple tensile strengths with specific grades and classifications.'
    ],
    relatedTerms: ['Flatbed', 'Load Bar', 'Tarp', 'Palletization']
  },
  {
    id: 'supply-chain',
    term: 'Supply chain',
    letter: 'S',
    page: 21,
    category: 'operations',
    icon: '',
    calloutEs: 'End-to-end network between a company and its suppliers to transform raw materials into finished products and distribute them to the final buyer.',
    definitionEn: 'A network between a company and its suppliers to produce and distribute a specific product to the final buyer. This network includes different activities, people, entities, information, and resources. The supply chain also represents the steps it takes to get the product or service from its original state to the customer. Companies develop supply chains so they can reduce their costs and remain competitive in the business landscape. involves a series of steps involved to get a product or service to the customer. The steps include moving and transforming raw materials into finished products, transporting those products, and distributing them to the end user. The entities involved in the supply chain include producers, vendors, warehouses, transportation companies, distribution centers, and retailers.',
    explanationEs: 'Cadena de Suministro: ecosistema de actividades, personas, entidades, información y recursos que permite transformar materias primas en productos terminados y llevarlos hasta el consumidor final reduciendo costos y manteniendo la competitividad.',
    details: [
      'Six core entities involved in the supply chain:',
      '1. Producers.',
      '2. Vendors.',
      '3. Warehouses.',
      '4. Transportation companies.',
      '5. Distribution centers.',
      '6. Retailers.'
    ],
    relatedTerms: ['Logistics Manager', 'Third Part Logistics (3PL)', 'Cross Dock', 'Delivery']
  },

  // ================= T =================
  {
    id: 'tankers',
    term: 'Tankers',
    letter: 'T',
    page: 22,
    category: 'equipment',
    icon: '',
    calloutEs: 'Large motor vehicles or semi-trailers designed to carry liquids or gases on roads; may be insulated or non-insulated, pressurized or non-pressurized.',
    definitionEn: 'A motor vehicle designed to carry liquids or gases on roads. Tank trucks tend to be large; they may be insulated or non-insulated; pressurized or non-pressurized; and designed for single or multiple loads (often by means of internal divisions in their tank). Some are semi-trailer trucks. They are difficult to drive due to their high center of gravity.',
    explanationEs: 'Camiones tanque o pipas (Tankers): vehículos especializados para el transporte carretero de líquidos o gases a granel.',
    details: [
      'Configurations: Insulated or non-insulated; pressurized or non-pressurized; single or multiple loads via internal tank divisions.',
      'Driving Challenge: Difficult to drive due to their high center of gravity.'
    ],
    relatedTerms: ['HAZMAT', 'Hopper', 'Trailer']
  },
  {
    id: 'tariff',
    term: 'Tariff',
    letter: 'T',
    page: 22,
    category: 'finance',
    icon: '',
    calloutEs: 'Formal document published by a carrier identifying its service pricing and the governing rules under which those services are performed.',
    definitionEn: 'The formal document published by a carrier to identify their pricing for services and also to publish the rules under which they will perform the services they hold themselves out for.',
    explanationEs: 'Tarifario o Arancel: documento oficial publicado por una compañía transportista donde establece tanto su tabulador de precios como el reglamento operativo bajo el cual ofrece sus servicios.',
    details: [
      'Formal document published by a carrier establishing service pricing and governing operational rules.'
    ],
    relatedTerms: ['Freight Class', 'Rate', 'Spot Rate']
  },
  {
    id: 'tarp',
    term: 'Tarp',
    letter: 'T',
    page: 22,
    category: 'equipment',
    icon: '',
    calloutEs: 'Large sheet of strong, flexible, water-resistant or waterproof material (canvas, polyurethane-coated polyester, or polyethylene) used to protect cargo.',
    definitionEn: 'A large sheet of strong, flexible, water-resistant or waterproof material, often cloth such as canvas or polyester coated with polyurethane, or made of plastics such as polyethylene.',
    explanationEs: 'Lona impermeable (Tarpaulin): cubierta protectora de gran resistencia que se coloca sobre la mercancía en remolques abiertos (Flatbed, Dropdeck) para resguardarla de la lluvia, el viento y el polvo.',
    details: [
      'Materials: Canvas cloth, polyester coated with polyurethane, or plastics such as polyethylene.'
    ],
    relatedTerms: ['Flatbed', 'Conestoga', 'Straps']
  },
  {
    id: 'tender',
    term: 'Tender',
    letter: 'T',
    page: 22,
    category: 'finance',
    icon: '',
    calloutEs: 'Formal proposal or request issued by a company inviting suppliers or carriers to bid on supplying a specific project, product, or service.',
    definitionEn: 'A formal proposal or request issued by a company, to suppliers. Generally, the issuance of tender is a call for the suppliers to bid for the supply of a specific project, product or service. The tender is mostly issued to get a project done at a reasonable cost and time frame possible. To ensure a smooth and fair competition among the bidders, the process of bidding is guided by law.',
    explanationEs: 'Licitación u oferta formal de carga (Load Tender): convocatoria emitida por una empresa a sus proveedores o transportistas para que presenten sus ofertas (bids) y adjudicar un proyecto o ruta al mejor costo y plazo posibles bajo competencia justa.',
    details: [
      'Formal call for suppliers or carriers to bid on a specific project, product, or service at a reasonable cost and timeframe.'
    ],
    relatedTerms: ['Bidding', 'Rate Confirmation', 'Rate']
  },
  {
    id: 'temperature-recorder-or-data-logger',
    term: 'Temperature Recorder or Data Logger',
    letter: 'T',
    page: 23,
    category: 'equipment',
    icon: '',
    calloutEs: 'Portable battery-powered sensor device placed inside refrigerated trailers (Reefers) to independently measure and digitally store temperature over time.',
    definitionEn: 'A portable device used inside refrigerated trailers that is capable of independently recording temperature over a defined period of time. Most temperature recorders have an internal thermistor or thermocouple, or can be connected to external sources. Sampling and measurement are periodically taken and digitally stored. Many recorders have a built in display of data with newer models having an out of tolerance warning. Most recorders are small (the size of a mobile phone), battery powered, and portable; most are also equipped with a microprocessor, internal memory for data storage, and sensors',
    explanationEs: 'Registrador de temperatura o Data Logger: aparato electrónico portátil (del tamaño de un teléfono móvil) que se introduce en los remolques refrigerados para medir y guardar digitalmente el historial térmico de la cadena de frío.',
    details: [
      'Hardware: Internal thermistor or thermocouple, microprocessor, internal memory, battery, and sensors (about the size of a mobile phone).',
      'Features periodic digital sampling, built-in data display, and out-of-tolerance warnings.'
    ],
    relatedTerms: ['Reefer', 'Fahrenheit', 'Claim']
  },
  {
    id: 'third-part-logistics-3pl',
    term: 'Third Part Logistics (3PL)',
    acronym: '3PL',
    letter: 'T',
    page: 23,
    category: 'roles',
    icon: '',
    calloutEs: 'Third-party or contract logistics company to which services like purchasing, warehousing, inventory, transportation, and order management are outsourced.',
    definitionEn: 'A third-party, or contract, logistics company. A firm to which logistics services are outsourced. Typically handles many of the following tasks: purchasing, inventory management/warehousing, transportation management, order management.',
    explanationEs: 'Logística de Terceros (3PL): firma especializada a la que una empresa externaliza (outsource) total o parcialmente sus operaciones logísticas y de cadena de suministro.',
    details: [
      'Outsourced contract logistics firm handling:',
      '• Purchasing.',
      '• Inventory management and warehousing.',
      '• Transportation management.',
      '• Order management.'
    ],
    relatedTerms: ['Freight Broker', 'Supply chain', 'Warehouse', 'Transportation Management System (TMS)']
  },
  {
    id: 'tonu-truck-ordered-not-used',
    term: 'TONU (Truck Ordered, not Used)',
    acronym: 'TONU',
    letter: 'T',
    page: 23,
    category: 'finance',
    icon: '',
    calloutEs: 'Cancellation fee assessed when a truck is ordered and dispatched but the order is subsequently cancelled.',
    definitionEn: 'This fee is a cancellation charge for ordering a truck and then cancelling the order',
    explanationEs: 'Camión Ordenado, No Utilizado (TONU): tarifa de compensación pagada al transportista cuando el cliente o broker solicita una unidad, el camión se moviliza hacia el punto de carga y la orden es cancelada a último momento.',
    details: [
      'Cancellation fee assessed when a truck is ordered and dispatched but the order is subsequently cancelled.'
    ],
    relatedTerms: ['Detention', 'Layover', 'Rate Confirmation']
  },
  {
    id: 'transportation-management-system-tms',
    term: 'Transportation Management System (TMS)',
    acronym: 'TMS',
    letter: 'T',
    page: 23,
    category: 'technology',
    icon: '',
    calloutEs: 'Specialized software for planning, executing, and optimizing shipments: compare carrier rates, book the shipment, and track its movement to delivery.',
    definitionEn: "Specialized software for planning, executing and optimizing the shipment of goods. Users perform three main tasks on a TMS: Find and compare the rates (prices) and services of carriers available to ship a customer's order, book the shipment, then track its movement to delivery. The broader goals of using a TMS are to improve shipping efficiency, reduce costs, gain real-time supply chain visibility and ensure customer satisfaction.",
    explanationEs: 'Sistema de Gestión de Transporte (TMS): plataforma tecnológica central utilizada por shippers, brokers y 3PLs para administrar todo el ciclo de vida de los envíos.',
    details: [
      'Three main user tasks on a TMS:',
      '1. Find and compare carrier rates (prices) and services.',
      '2. Book the shipment.',
      '3. Track its movement to delivery.',
      'Broader Goals: Improve shipping efficiency, reduce costs, gain real-time supply chain visibility, and ensure customer satisfaction.'
    ],
    relatedTerms: ['ITS Dispatch', 'Tracking', 'CRM', 'Third Part Logistics (3PL)']
  },
  {
    id: 'trailer',
    term: 'Trailer',
    letter: 'T',
    page: 23,
    category: 'equipment',
    icon: '',
    calloutEs: 'Unpowered wheeled container pulled by a powered truck or tractor to transport large or heavy cargo.',
    definitionEn: 'A container on wheels pulled by a truck or another vehicle used to transport large or heavy cargo. In basic term, the trailer is an unpowered vehicle usually towed by powered vehicle.',
    explanationEs: 'Remolque: unidad de carga sobre ruedas que carece de motor propio (unpowered vehicle) y está diseñada para ser acoplada y arrastrada por un tractocamión.',
    details: [
      'Unpowered wheeled container towed by a powered vehicle to transport large or heavy cargo.'
    ],
    relatedTerms: ['Truck', 'Dry Van', 'Reefer', 'Flatbed']
  },
  {
    id: 'transportation-manager',
    term: 'Transportation Manager',
    letter: 'T',
    page: 23,
    category: 'roles',
    icon: '',
    calloutEs: 'Professional responsible for directing, coordinating, planning, and overseeing transportation operations while ensuring road haulage legal compliance.',
    definitionEn: 'Responsible for directing, coordinating, planning and overseeing tasks and operations within an organization involving transportation activities. They are required to ensure the legal requirements for road haulage are met.',
    explanationEs: 'Gerente de Transporte: profesional encargado de liderar las operaciones de tráfico y despacho de una empresa, garantizando además que se cumplan todos los requisitos legales y regulatorios del transporte por carretera (road haulage).',
    details: [
      'Directs, coordinates, plans, and oversees organizational transportation operations.',
      'Ensures all legal and regulatory requirements for road haulage are met.'
    ],
    relatedTerms: ['Logistics Manager', 'Dispatcher', 'Federal Motor Carrier Safety Administration (FMCSA)']
  },
  {
    id: 'tracking',
    term: 'Tracking',
    letter: 'T',
    page: 23,
    category: 'technology',
    icon: '',
    calloutEs: 'System used by carriers to record cargo movement at each processing location and relay real-time location status updates to shippers.',
    definitionEn: 'A system used by carriers to record the movement cargo during transportation. At every processing location, the goods are identified and data relay to the central processing system. This data is then used to give status/update of the goods location to the shippers.',
    explanationEs: 'Rastreo y seguimiento: sistema tecnológico mediante el cual se identifica y registra el paso de la mercancía en cada punto del trayecto, enviando los datos al sistema central para informar el estatus y ubicación en tiempo real al cliente.',
    details: [
      'Identifies goods at each processing location and relays data to a central system to provide real-time location status updates to shippers.'
    ],
    relatedTerms: ['Transportation Management System (TMS)', 'Estimated time of arrival (ETA)', 'ITS Dispatch']
  },
  {
    id: 'truck',
    term: 'Truck',
    letter: 'T',
    page: 24,
    category: 'equipment',
    icon: '',
    calloutEs: 'Heavy motor vehicle built for moving goods from one point to another; the primary means of commercial transportation in many countries.',
    definitionEn: 'A heavy and large motor vehicle built for moving goods from one point to the other. Depending on the types of goods to transport, the truck varies in size and shape. In some countries, truck is the primary means for commercial transportation, and it is used for bringing goods into circulation.',
    explanationEs: 'Camión: vehículo motorizado de carga pesada diseñado para el traslado terrestre de bienes comerciales, variando en tamaño y configuración según la naturaleza de la mercancía.',
    details: [
      'Heavy motor vehicle built for commercial freight transportation and bringing goods into circulation.'
    ],
    relatedTerms: ['Trailer', 'Driver', 'Asset Based Carrier', 'Owner Operator']
  },
  {
    id: 'truckstop',
    term: 'Truckstop',
    letter: 'T',
    page: 24,
    category: 'technology',
    icon: '',
    calloutEs: 'Load board launched in 1995 as the first web marketplace to search for loads; used by more than 200,000 carriers, freight forwarders, and shippers.',
    definitionEn: 'This load board was launched in 1995 as the first marketplace to search for loads on the web. More than 200,000 carriers, freight forwarders, and shippers use Truckstop.com to find loads.',
    explanationEs: 'Truckstop.com: plataforma pionera de Load Board fundada en 1995 como el primer mercado en Internet para publicar y buscar cargas de transporte.',
    details: [
      'Launched in 1995 as the first web-based marketplace to search for loads.',
      'Used by more than 200,000 carriers, freight forwarders, and shippers.'
    ],
    relatedTerms: ['Load Board', 'Bidding', 'ITS Dispatch']
  },

  // ================= V =================
  {
    id: 'van',
    term: 'Van',
    letter: 'V',
    page: 24,
    category: 'equipment',
    icon: '',
    calloutEs: 'Fully enclosed semi-trailer designed to carry palletized, boxed, or loose freight while protecting shipments from outside elements.',
    definitionEn: 'A type of semi-trailer that’s fully enclosed to protect shipments from outside elements. Designed to carry palletized, boxed or loose freight.',
    explanationEs: 'Furgón o caja cerrada (Van): semirremolque totalmente hermético que resguarda la mercancía del clima exterior, apto para llevar carga sobre pallets, en cajas o a granel.',
    details: [
      'Fully enclosed semi-trailer protecting palletized, boxed, or loose freight from outside elements.'
    ],
    relatedTerms: ['Dry Van', 'Vented Van', 'Reefer', 'Pallet']
  },
  {
    id: 'vented-van',
    term: 'Vented Van',
    letter: 'V',
    page: 24,
    category: 'equipment',
    icon: '',
    calloutEs: 'Enclosed trailer vented in both the front and rear to allow continuous airflow for goods that might otherwise require a Reefer.',
    definitionEn: 'Vans that are vented in both the rear and the front of the trailer, which allows for air flow. The air flow enables vented vans to haul goods that may otherwise require a reefer truck.',
    explanationEs: 'Caja seca ventilada: semirremolque cerrado que cuenta con aberturas de ventilación frontales y traseras para generar circulación natural de aire, ideal para productos agrícolas (como papas, cebollas o sandías) que necesitan ventilación sin requerir un Reefer encendido.',
    details: [
      'Vented in both the front and rear of the trailer to allow continuous airflow.',
      'Enables hauling certain temperature-sensitive goods that might otherwise require a Reefer.'
    ],
    relatedTerms: ['Dry Van', 'Van', 'Reefer']
  },

  // ================= W =================
  {
    id: 'warehouse',
    term: 'Warehouse',
    letter: 'W',
    page: 24,
    category: 'operations',
    icon: '',
    calloutEs: 'Storage facility for products whose principal activities include receipt of product, storage, shipment, and order picking.',
    definitionEn: 'Storage place for products. Principal warehouse activities include receipt of product, storage, shipment, and order picking.',
    explanationEs: 'Almacén o bodega: instalación logística destinada al resguardo y administración de inventarios dentro de la cadena de suministro.',
    details: [
      'Four principal warehouse activities:',
      '1. Receipt of product.',
      '2. Storage.',
      '3. Shipment.',
      '4. Order picking.'
    ],
    relatedTerms: ['Loading Dock', 'Cross Dock', 'Fork lift', 'Pallet', 'Supply chain']
  },
  {
    id: 'wire-transfer',
    term: 'Wire Transfer',
    letter: 'W',
    page: 24,
    category: 'finance',
    icon: '',
    calloutEs: 'Electronic payment service for transferring funds by wire (via SWIFT, Fedwire, or CHIPS); one of the most expensive payment terms at $30 per transaction.',
    definitionEn: 'An electronic payment service for transferring funds by wire, for example through SWIFT, the Federal Reserve Wire Network or the Clearing House Interbank Payments System. This payment term is one of the most expensive and it cost $30 per transaction.',
    explanationEs: 'Transferencia bancaria por cable (Wire): método electrónico de transferencia inmediata de fondos entre bancos a través de redes interbancarias.',
    details: [
      'Networks Used: SWIFT, Federal Reserve Wire Network (Fedwire), or Clearing House Interbank Payments System (CHIPS).',
      'Transaction Cost: One of the most expensive payment terms, costing $30 per transaction.'
    ],
    relatedTerms: ['ACH', 'Comcheck', 'Quick pay']
  },
  {
    id: 'w9',
    term: 'W9',
    acronym: 'W9',
    letter: 'W',
    page: 24,
    category: 'documents',
    icon: '',
    calloutEs: 'IRS tax form (Request for Taxpayer Identification Number and Certification) used to confirm a person\'s or entity\'s name, address, and TIN.',
    definitionEn: "An Internal Revenue Service (IRS) tax form that is used to confirm a person's name, address, and taxpayer identification number (TIN) for employment or other income-generating purposes. The confirmation can be requested for either an individual defined as a U.S. citizen or a person defined as a resident alien. A W-9 form is also known as a Request for Taxpayer Identification Number and Certification form.",
    explanationEs: 'Formulario W-9 del Servicio de Impuestos Internos (IRS): documento fiscal obligatorio en Estados Unidos para certificar el nombre legal, dirección fiscal y TIN (SSN o EIN) de contratistas, transportistas y empresas con fines de declaración de ingresos.',
    details: [
      'Official Name: "Request for Taxpayer Identification Number and Certification form".',
      'Used to confirm name, address, and Taxpayer Identification Number (TIN) for U.S. citizens, resident aliens, or business entities.'
    ],
    relatedTerms: ['Carrier Package', 'Shipper Package', 'Carrier Account Application']
  }
];
