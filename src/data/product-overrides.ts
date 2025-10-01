export type ProductOverride = {
  /** HTML string rendered as the main description on the product detail page */
  descriptionHtml?: string | null;
  /** Optional gallery overrides that replace Printful mockups */
  gallery?: string[];
  /** Optional tag overrides */
  tags?: string[];
  /** Controls ordering on home/shop pages (lower number = higher priority) */
  sortOrder?: number;
};

export type ProductOverrideMap = Record<string, ProductOverride>;

/** Helper to define multi-line HTML strings without escaping */
export const html = String.raw;

/**
 * Overrides keyed by Printful external_id (preferred) or sync product id as string.
 * Use the special key "__default" to define fallback values applied to every product.
 */
export const PRODUCT_OVERRIDES: ProductOverrideMap = {
  __default: {
    descriptionHtml: null,
    gallery: [],
  },
  
  "3186": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759215273/Vispea/images/Kuro_clear_tyl4n9.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759215276/Vispea/images/Kurosawa_exbf6p.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759215274/Vispea/images/Kuro_orange_v8rxhj.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759215272/Vispea/images/Kuro_black_b0bixc.webp"
      ],
    sortOrder: 10,
  },

  "3104": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211353/Vispea/images/Laughing_Granny_clear_huu6f9.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759212655/Vispea/images/Laughing_Granny_pqotsk.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759212654/Vispea/images/Laughing_Granny_orange_ksk6xr.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211346/Vispea/images/Laughing_Granny_black_axoc0q.jpg"
      ],
    sortOrder: 20,
  },

  "3260": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211319/Vispea/images/nun_clear_kpkrrv.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211323/Vispea/images/nun_debtgk.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211320/Vispea/images/nun_orange_rlbra5.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211317/Vispea/images/nun_black_yqzsfs.jpg"
      ],
    sortOrder: 30,
  },

  "3398": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759167607/Vispea/images/rebel_clear_l4boba.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759169341/Vispea/images/rebel_lz9d31.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759167607/Vispea/images/rebel_orange_ujdqo1.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759167607/Vispea/images/rebel_black_wbrrwq.jpg"
      ],
    sortOrder: 40,
  },

  "3424": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211047/Vispea/images/be_light_clear_pwvkil.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211050/Vispea/images/be_the_light_yfb5hg.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211048/Vispea/images/be_light_orange_fnd0nc.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211046/Vispea/images/be_light_black_kokoae.jpg"
      ],
    sortOrder: 50,
  },

  "3601": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211053/Vispea/images/disobey_clear_fk1zaf.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211303/Vispea/images/disobey_av734m.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211121/Vispea/images/disobey_orange_bw3gde.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211052/Vispea/images/disobey_black_babcts.jpg"
      ],
    sortOrder: 60,
  },

  "3822": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759167609/Vispea/images/Hoxton_clear_uxifv8.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759169341/Vispea/images/hoxton_gallery_d4pg11.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759167607/Vispea/images/Hoxton_orange_ggaibe.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759167607/Vispea/images/Hoxton_black_sbe0de.jpg"
      ],
    sortOrder: 70,
  },

  "3526": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211304/Vispea/images/fuck_wars_clear_nzaijh.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211308/Vispea/images/fuck_wars_pim533.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211306/Vispea/images/fuck_wars_orange_aaobm8.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211303/Vispea/images/fuck_wars_black_eijbdh.jpg"
      ],
    sortOrder: 80,
  },

  "3239": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
     <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211311/Vispea/images/never_clear_ltbo4d.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211315/Vispea/images/never_nw9fso.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211313/Vispea/images/never_orange_brenlo.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211309/Vispea/images/never_black_fgv1jv.jpg"
      ],
    sortOrder: 90,
  },

  "3277": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211324/Vispea/images/pony_clear_zfehqx.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211328/Vispea/images/pony_muf5h4.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211326/Vispea/images/pony_orange_avgapo.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759211324/Vispea/images/pony_bl_fhztvo.webp"
      ],
    sortOrder: 100,
  },

  "3577": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759219515/Vispea/images/Just_be_nice_clear_y6bxwg.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759219520/Vispea/images/just_be_nice_s29fb2.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759219517/Vispea/images/Just_be_nice_orange_ubqxbk.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759219515/Vispea/images/Just_be_nice_black_glnvx4.jpg"
      ],
    sortOrder: 110,
  },

  "3222": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759219835/Vispea/images/inner_child_clear_oei6qe.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759219839/Vispea/images/inner_child_octw9h.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759219837/Vispea/images/inner_child_orange_rm6u9i.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759219834/Vispea/images/inner_child_black_y5poa1.jpg"
      ],
    sortOrder: 120,
  },

  "3305": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
     <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759220104/Vispea/images/monalisa_pele_clear_kfaikf.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759220108/Vispea/images/monalisa_pele_gfohfn.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759220106/Vispea/images/monalisa_pele_orange_izxbls.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759220102/Vispea/images/monalisa_pele_black_gzagvq.jpg"
      ],
    sortOrder: 130,
  },

  "3848": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222123/Vispea/images/you_are_free_clear_i2suad.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222129/Vispea/images/you_are_free_znseez.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222126/Vispea/images/you_are_free_orange_utpsvm.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222121/Vispea/images/you_are_free_black_pnatxd.jpg"
      ],
    sortOrder: 140,
  },

  "3861": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222106/Vispea/images/fuc_i_love_u_clear_cubv4n.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222111/Vispea/images/fuc_i_love_u_txu0qt.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222108/Vispea/images/fuc_i_love_u_orange_sc6y5o.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222105/Vispea/images/fuc_i_love_u_black_fqibls.jpg"
      ],
    sortOrder: 150,
  },

  "3809": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
     <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222114/Vispea/images/withered_heart_clear_xlncri.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222119/Vispea/images/withered_heart_ygltji.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222116/Vispea/images/Withered_heart_orange_bgrr7l.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222112/Vispea/images/withered_heart_black_jistv0.jpg"
      ],
    sortOrder: 160,
  },

  "3770": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222720/Vispea/images/superboy_clear_bkbnjw.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222723/Vispea/images/superboy_auepnz.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222721/Vispea/images/superboy_orange_ue6i5a.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759222725/Vispea/images/superboyblack_id0oyj.jpg"
      ],
    sortOrder: 170,
  },

  "4121": {
    descriptionHtml: html`
      <br/><p><strong>TOO . SMOOTH . TOO . CARE .</strong></p>
      <p><strong>This product is made especially for you as soon as you swipe your card. So it takes us a bit longer to deliver it to you. We print on demand because we are too lazy to run a bloody warehouse.<br/>
      If you don't have patience - do not order!</strong></p>
      <p>* The sizes correspond to a smaller size in the US market, so US customers should order a size up.</p>
      <p><strong>The boring stuff:</strong><br/>
Made from 100% organic ring-spun cotton, it's high-quality, super comfy, and eco-friendly.</p>
<p>• 100% organic ring-spun cotton
• Fabric weight: 5.3 oz./yd.² (180 g/m²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1 × 1 rib at collar
• Wide double-needle topstitch on the sleeves and bottom hems
• Self-fabric neck tape (inside, back of the neck)
• Blank product sourced from Bangladesh</p>
<p>• Traceability:
- Weaving—Bangladesh
- Dyeing—Bangladesh
- Manufacturing—Bangladesh
• Contains 0% recycled polyester
• Contains 0% dangerous substances</p>
<p>Age restrictions: For adults
EU Warranty: 2 years
Other compliance information: Meets the EU REACH requirements.</p>
<p>In compliance with the General Product Safety Regulation (GPSR), <b>Oak inc.</b> and <b>SINDEN VENTURES LIMITED</b> ensure that all consumer products offered are safe and meet EU standards. For any product safety related inquiries or concerns, please contact our EU representative at <b>gpsr@sindenventures.com</b>. You can also write to us at <b>123 Main Street, Anytown, Country</b> or<b> Markou Evgenikou 11, Mesa Geitonia, 4002, Limassol, Cyprus.</b></p>
    `,
    gallery: [
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759158356/Vispea/images/car_clear_uvlawh.webp",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759158357/Vispea/images/car_orange_xgrlwa.jpg",
      "https://res.cloudinary.com/kinhcode01/image/upload/v1759158356/Vispea/images/car_black_lxwcrj.webp",
    ],
    sortOrder: 690,
  },
};
