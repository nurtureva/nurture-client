import { Form } from 'antd';

export default function NewProviderForm(props) {
  const formItemWrapper = (element) => {
    return <Form.Item>element</Form.Item>;
  };

  return <Form></Form>;
  //name, business name, brief description of services
  //address, email address, phone number
  //payment options
  //services
  //certificates
  //visibility: currently practicing, permission to share
  //private personal information
  // contact:  {
  // Your First and Last Name : "Kara Weiland, LCSW",
  // Your Organization or Business Name : "Yellow Bird Counseling and Wellness",
  // Business Address : "3126 West Cary Street",
  // Business Address 2 : "(Virtual)",
  // City/Town : "Richmond",
  // State : "VA",
  // Zip Code : "23221",
  // Country : "",
  // Work Email Address : "kara@yellowbirdwellness.com",
  // Phone Number : "8042779649",
  // Open-Ended Response :
  // }
  // payment: {
  // Free or Pro Bono Service : ""
  // Private Insurance : ""
  // Medicaid : ""
  // FAMIS : ""
  // Fee for Service : "Fee for Service"
  // Sliding Scale : ""
  // All of the above : ""
  // Other (please specify) :
  // }
  // services: {
  // Doula Support (Birth, Postpartum, Bereavement, or Full Spectrum) : "Doula Support (Birth, Postpartum, Bereavement, or Full Spectrum)"
  // Lactation  or Breast/Chestfeeding Support : "Lactation  or Breast/Chestfeeding Support"
  // Perinatal Counseling/Psychotherapy/Mental Health Support : ""
  // Other (please specify)
  // }
  // certificates: {
  // International Board Certified Lactation Consultant (IBCLC) : ""
  // Certified Lactation Counselor (CLC) : ""
  // Certified Lactation Specialist (CLS) : ""
  // Certified Lactation Educator (CLE) : "Certified Lactation Educator (CLE)"
  // Certified Breastfeeding Counselor (CBC) : ""
  // Lactation Education Counselor (LEC) : ""
  // La Leche League Leader (LLL) : ""
  // Breastfeeding USA Counselor : ""
  // Peer Breastfeeding Counselor : ""
  // Community Health Worker (CHW) : ""
  // Certified Doula (CD) : "Certified Doula (CD)"
  // Licensed Professional Counselor (LPC) : ""
  // Licensed Clinical Social Worker (LCSW) : ""
  // Licensed Clinical Psychologist (LCP) : ""
  // Doctor of Psychology (Psy.D) : ""
  // Perinatal Mental Health Certification (PMH-C) : ""
  // Doctoral Degree (PhD) : ""
  // Medical Degree (MD) : ""
  // Nursing Degree (RN, BSN) : "Nursing Degree (RN, BSN)"
  // I do not have any credentials : ""
  // Other (please specify) :
  // }
}
