const CATEGORY_DEFINITIONS = {
  "Bathroom Renovation": {
    work: [
      "Remove existing fittings",
      "Remove existing bath",
      "Remove wall and floor tiles",
      "Remove hob",
      "Brick up front of bath",
      "Render walls",
      "Screed shower floor with correct falls to waste and install puddle flange",
      "Prepare shower floor to install channel drain",
      "Apply new waterproof membrane in shower area as per Building Construction Regulations",
      "Make mitre edge to all external corners",
      "Lay floor tiles",
      "Lay wall tiles",
      "Apply new flexible waterproof sealant to all internal shower corners",
      "Remove existing shower screen",
      "Install new shower screen",
      "Install mirror",
      "Install double towel rail",
      "Install toilet roll holder",
      "Disconnect existing vanity (plumbing)",
      "Install new vanity (plumbing)",
      "Disconnect existing bath (plumbing)",
      "Install bath mixer (plumbing)",
      "Install new bath (plumbing)",
      "Relocate shower head pipe (plumbing)",
      "Install shower head (plumbing)",
      "Install shower mixer (plumbing)",
      "Disconnect existing WC (plumbing)",
      "Install new back-to-wall WC (plumbing)",
      "Install one double power point (electrical)",
      "Install LED downlight fittings (electrical)",
      "Install ceiling ventilation fan (electrical)",
    ],
    supply: [
      "Completed white 900 mm wall-hung vanity with white sparkle stone benchtop, round white basin, pop-up waste and chrome mixer",
      "Frameless bevelled and polished-edge mirror – 750 × 900 mm",
      "Freestanding bath",
      "Chrome two-in-one shower head without rail",
      "Chrome mixers – one shower and one bath",
      "Custom-made framed shower screen with pivot door and clear safety glass",
      "Rimless back-to-wall white toilet suite with mini stopper tap",
      "Chrome toilet roll holder",
      "Chrome double towel rail",
      "Tiles and grout",
      "Ceiling ventilation fan",
      "LED downlight",
      "Waterproof membrane",
      "Channel drain with tile insert",
      "Floor wastes – 50 mm and 80 mm",
      "Premium adhesive, sand, cement and primer",
      "Delivery",
      "Skip bin",
    ],
  },
  "Ensuite & WC": {
    work: [
      "Remove existing fittings",
      "Remove existing bath",
      "Remove wall and floor tiles",
      "Remove hob",
      "Brick up front of bath",
      "Render walls",
      "Screed shower floor with correct falls to waste and install puddle flange",
      "Prepare shower floor to install channel drain",
      "Apply new waterproof membrane in shower area as per Building Construction Regulations",
      "Make mitre edge to all external corners",
      "Lay floor tiles",
      "Lay wall tiles",
      "Apply new flexible waterproof sealant to all internal shower corners",
      "Remove existing shower screen",
      "Install new shower screen",
      "Install mirror",
      "Install double towel rail",
      "Install toilet roll holder",
      "Disconnect existing vanity (plumbing)",
      "Install new vanity (plumbing)",
      "Disconnect existing bath (plumbing)",
      "Install bath mixer (plumbing)",
      "Install new bath (plumbing)",
      "Relocate shower head pipe (plumbing)",
      "Install shower head (plumbing)",
      "Install shower mixer (plumbing)",
      "Disconnect existing WC (plumbing)",
      "Install new back-to-wall WC (plumbing)",
      "Install one double power point (electrical)",
      "Install LED downlight fittings (electrical)",
      "Install ceiling ventilation fan (electrical)",
    ],
    supply: [
      "Completed white 900 mm wall-hung vanity with white sparkle stone benchtop, round white basin, pop-up waste and chrome mixer",
      "Frameless bevelled and polished-edge mirror – 750 × 900 mm",
      "Bath",
      "Chrome two-in-one shower head without rail",
      "Chrome mixers – one shower and one bath",
      "Custom-made framed shower screen with pivot door and clear safety glass",
      "Rimless back-to-wall white toilet suite with mini stopper tap",
      "WC roll holder",
      "Chrome double towel rail",
      "Tiles and grout",
      "Ceiling ventilation fan",
      "LED downlight",
      "Waterproof membrane",
      "Premium adhesive, sand, cement and primer",
      "Floor wastes – 50 mm and 80 mm",
      "Delivery",
      "Skip bin",
    ],
  },
  WC: {
    work: [
      "Remove existing toilet",
      "Remove wall and floor tiles",
      "Screed floor",
      "Lay floor tiles",
      "Lay wall tiles halfway around",
      "Install new back-to-wall WC (plumbing)",
      "Install WC roll holder",
      "Install LED downlight fittings (electrical)",
      "Install ceiling ventilation fan (electrical)",
    ],
    supply: [
      "Rimless back-to-wall white toilet suite with mini stopper tap",
      "WC roll holder",
      "Tiles and grout",
      "Ceiling ventilation fan",
      "LED downlight",
      "Premium adhesive, sand, cement and primer",
      "Floor waste – 50 mm",
    ],
  },
  Laundry: {
    work: [
      "Remove wall and floor tiles",
      "Screed floor",
      "Prepare wall for splashback tiles",
      "Lay floor tiles",
      "Lay wall tiles",
      "Cabinet to stay",
      "Move washing machine pipes under the benchtop",
      "Install a power point under the benchtop",
      "Install taps",
      "Install fittings",
    ],
    supply: [
      "Chrome tap set",
      "Tiles and grout",
      "Ceiling ventilation fan",
      "LED downlight",
      "Premium adhesive, sand, cement and primer",
      "Floor waste – 50 mm",
    ],
  },
};

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

const categoryStack = document.querySelector("#category-stack");
const categoryCount = document.querySelector("#category-count");
const includeGst = document.querySelector("#include-gst");

let nextCategoryId = 1;
let nextItemId = 1;
let categories = [];

function uniqueId(prefix) {
  const id = `${prefix}-${Date.now()}-${nextItemId}`;
  nextItemId += 1;
  return id;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createWorkItem(description, custom = false) {
  return {
    id: uniqueId("work"),
    description,
    custom,
    selected: custom,
    quantity: custom ? "1" : "",
    price: "",
  };
}

function createSupplyItem(description, selected = false) {
  return {
    id: uniqueId("supply"),
    description,
    selected,
  };
}

function addBlankCategory() {
  categories.push({
    id: nextCategoryId,
    name: "",
    workItems: [],
    supplyItems: [],
  });
  nextCategoryId += 1;
  renderCategories();
}

function setCategoryType(category, name) {
  category.name = name;
  if (!name) {
    category.workItems = [];
    category.supplyItems = [];
    return;
  }

  const definition = CATEGORY_DEFINITIONS[name];
  category.workItems = definition.work.map((item) => createWorkItem(item));
  category.supplyItems = definition.supply.map((item) => createSupplyItem(item));
}

function getCategory(categoryId) {
  return categories.find((category) => category.id === Number(categoryId));
}

function getWorkItem(category, itemId) {
  return category.workItems.find((item) => item.id === itemId);
}

function getSupplyItem(category, itemId) {
  return category.supplyItems.find((item) => item.id === itemId);
}

function categoryOptions(selected) {
  const options = ['<option value="">Choose a category</option>'];
  Object.keys(CATEGORY_DEFINITIONS).forEach((name) => {
    const isSelected = selected === name ? " selected" : "";
    options.push(`<option value="${escapeHtml(name)}"${isSelected}>${escapeHtml(name)}</option>`);
  });
  return options.join("");
}

function workRowTemplate(item) {
  const checked = item.selected ? " checked" : "";
  const disabled = item.selected ? "" : " disabled";
  const amount = item.selected
    ? Number(item.quantity || 0) * Number(item.price || 0)
    : 0;

  const description = item.custom
    ? `<input class="custom-work-description" value="${escapeHtml(item.description)}" placeholder="Enter new work item" aria-label="Custom work item description" />`
    : `<span>${escapeHtml(item.description)}</span>`;

  const deleteButton = item.custom
    ? '<button type="button" class="row-delete-button delete-work">Delete</button>'
    : "";

  return `
    <div class="work-row${item.selected ? " is-selected" : ""}" data-work-id="${item.id}">
      <div class="work-primary">
        <input class="work-select" type="checkbox"${checked} aria-label="Select ${escapeHtml(item.description || "custom work item")}" />
        ${description}
        ${deleteButton}
      </div>
      <label class="field-cell">
        <span>Quantity</span>
        <input class="work-quantity" type="number" min="0" step="0.01" inputmode="decimal" value="${escapeHtml(item.quantity)}" placeholder="0"${disabled} />
      </label>
      <label class="field-cell price-field">
        <span>Unit price</span>
        <b>$</b>
        <input class="work-price" type="number" min="0" step="0.01" inputmode="decimal" value="${escapeHtml(item.price)}" placeholder="0.00"${disabled} />
      </label>
      <output class="work-amount">${currency.format(amount)}</output>
    </div>`;
}

function supplyRowTemplate(item) {
  return `
    <div class="supply-row${item.selected ? " is-selected" : ""}" data-supply-id="${item.id}">
      <input class="supply-select" type="checkbox"${item.selected ? " checked" : ""} aria-label="Select ${escapeHtml(item.description || "supply item")}" />
      <textarea class="supply-description" rows="1" placeholder="Enter supply and install text">${escapeHtml(item.description)}</textarea>
      <span class="supply-print-text">${escapeHtml(item.description)}</span>
      <button type="button" class="row-delete-button delete-supply">Delete</button>
    </div>`;
}

function categoryTemplate(category, index) {
  if (!category.name) {
    return `
      <article class="category-card blank-category" data-category-id="${category.id}">
        <div class="category-toolbar">
          <div class="category-number">${index + 1}</div>
          <label class="category-select-label">
            Select main category
            <select class="category-select">${categoryOptions("")}</select>
          </label>
          <button type="button" class="remove-button remove-category">Remove</button>
        </div>
        <div class="category-empty">
          <span>0${index + 1}</span>
          <p>Choose one of the four main categories to see its selectable work and supply items.</p>
        </div>
      </article>`;
  }

  return `
    <article class="category-card" data-category-id="${category.id}">
      <div class="category-toolbar">
        <div class="category-number">${index + 1}</div>
        <label class="category-select-label">
          Select main category
          <select class="category-select">${categoryOptions(category.name)}</select>
        </label>
        <button type="button" class="remove-button remove-category">Remove</button>
      </div>

      <div class="category-content">
        <h2 class="print-category-title">${escapeHtml(category.name)}</h2>
        <div class="items-header" aria-hidden="true">
          <span>Work item</span><span>Quantity</span><span>Unit price</span><span>Amount</span>
        </div>
        <div class="work-list">
          ${category.workItems.map(workRowTemplate).join("")}
        </div>
        <button type="button" class="add-work-item-button add-work-item"><span>+</span> Add more item</button>

        <section class="supply-box">
          <div class="supply-heading">
            <div>
              <h3>Supply and install</h3>
              <p>Select, edit or delete the fixtures and materials supplied.</p>
            </div>
            <span>No price required</span>
          </div>
          <div class="supply-list">
            ${category.supplyItems.map(supplyRowTemplate).join("")}
          </div>
          <button type="button" class="add-supply-item-button add-supply-item"><span>+</span> Add text</button>
        </section>
      </div>
    </article>`;
}

function renderCategories() {
  categoryStack.innerHTML = categories.map(categoryTemplate).join("");
  categoryCount.textContent = `${categories.length} ${categories.length === 1 ? "category" : "categories"}`;
  document.querySelectorAll(".supply-description").forEach(resizeTextarea);
  refreshTotals();
}

function resizeTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${Math.max(42, textarea.scrollHeight)}px`;
}

function refreshWorkRow(row, item) {
  row.classList.toggle("is-selected", item.selected);
  row.querySelector(".work-quantity").disabled = !item.selected;
  row.querySelector(".work-price").disabled = !item.selected;
  const amount = item.selected
    ? Number(item.quantity || 0) * Number(item.price || 0)
    : 0;
  row.querySelector(".work-amount").textContent = currency.format(amount);
}

function refreshTotals() {
  const subtotal = categories.reduce((categoryTotal, category) => {
    const itemTotal = category.workItems.reduce((total, item) => {
      if (!item.selected) return total;
      return total + Number(item.quantity || 0) * Number(item.price || 0);
    }, 0);
    return categoryTotal + itemTotal;
  }, 0);

  const gst = includeGst.checked ? subtotal * 0.1 : 0;
  const total = subtotal + gst;

  document.querySelector("#subtotal").textContent = currency.format(subtotal);
  document.querySelector("#gst").textContent = currency.format(gst);
  document.querySelector("#total").textContent = currency.format(total);
  document.querySelector("#deposit").textContent = currency.format(total * 0.05);
}

function displayDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function formValue(name) {
  return document.querySelector(`[name="${name}"]`)?.value.trim() || "";
}

function buildQuoteRows() {
  let itemNumber = 1;
  const rows = [];

  categories.forEach((category) => {
    if (!category.name) return;

    const workItems = category.workItems.filter(
      (item) => item.selected && item.description.trim(),
    );
    const supplyItems = category.supplyItems.filter(
      (item) => item.selected && item.description.trim(),
    );

    if (workItems.length === 0 && supplyItems.length === 0) return;

    rows.push(`
      <tr class="category-heading-row">
        <td></td>
        <td><strong>${escapeHtml(category.name)}</strong></td>
        <td></td>
      </tr>`);

    workItems.forEach((item) => {
      const quantity = Number(item.quantity || 0);
      const unitPrice = Number(item.price || 0);
      const amount = quantity * unitPrice;
      rows.push(`
        <tr class="quote-item-row">
          <td class="number-cell">${itemNumber}</td>
          <td>${escapeHtml(item.description)}</td>
          <td class="price-cell">
            <span>${escapeHtml(item.quantity || "0")} × ${currency.format(unitPrice)}</span>
            <strong>${currency.format(amount)}</strong>
          </td>
        </tr>`);
      itemNumber += 1;
    });

    if (supplyItems.length > 0) {
      rows.push(`
        <tr class="supply-quote-row">
          <td></td>
          <td>
            <strong>Supply and install:</strong>
            <ul>${supplyItems
              .map((item) => `<li>${escapeHtml(item.description)}</li>`)
              .join("")}</ul>
          </td>
          <td></td>
        </tr>`);
    }
  });

  if (rows.length === 0) {
    rows.push(`
      <tr class="empty-quote-row">
        <td></td>
        <td>No work items selected.</td>
        <td></td>
      </tr>`);
  }

  return rows.join("");
}

function calculateQuoteTotals() {
  const subtotal = categories.reduce((categoryTotal, category) => {
    return (
      categoryTotal +
      category.workItems.reduce((total, item) => {
        if (!item.selected) return total;
        return total + Number(item.quantity || 0) * Number(item.price || 0);
      }, 0)
    );
  }, 0);
  const gst = includeGst.checked ? subtotal * 0.1 : 0;
  const total = subtotal + gst;
  return { subtotal, gst, total, deposit: total * 0.05 };
}

function buildPrintableQuote() {
  const customerName = formValue("customerName");
  const mobile = formValue("mobile");
  const email = formValue("email");
  const address = formValue("address");
  const quoteNumber = formValue("quoteNumber");
  const quoteDate = displayDate(document.querySelector("#quote-date").value);
  const logoUrl = new URL("atlas-logo.jpeg", window.location.href).href;
  const totals = calculateQuoteTotals();

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Quotation ${escapeHtml(quoteNumber)}</title>
      <style>
        @page { size: A4; margin: 12mm 13mm; }
        * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        html, body { margin: 0; padding: 0; background: #fff; color: #111; }
        body { font-family: Georgia, "Times New Roman", serif; font-size: 10.5pt; line-height: 1.28; }
        .document { width: 100%; }
        .quote-header { display: grid; grid-template-columns: 1fr 62mm; gap: 12mm; align-items: start; min-height: 55mm; }
        .logo { width: 72mm; max-width: 100%; height: auto; display: block; }
        .company-block { color: #666; font-style: italic; }
        .company-block h1 { margin: 0 0 2mm; color: #111; font-size: 23pt; font-style: italic; font-weight: 600; line-height: 1; text-decoration: underline; }
        .company-block h2 { margin: 0 0 2mm; color: #666; font-size: 16pt; font-style: italic; font-weight: 600; }
        .company-block p { margin: 0.7mm 0; }
        .meta-customer { display: grid; grid-template-columns: 1fr 1fr; gap: 10mm; margin: 2mm 0 7mm; }
        .meta-lines p, .customer-lines p { margin: 1.2mm 0; min-height: 5mm; }
        .label { display: inline-block; min-width: 35mm; font-weight: 700; color: #555; }
        .customer-lines .label { min-width: 16mm; color: #111; }
        table { border-collapse: collapse; width: 100%; }
        .quotation-table { table-layout: fixed; border: 1px solid #222; }
        .quotation-table col.number { width: 13%; }
        .quotation-table col.description { width: 69%; }
        .quotation-table col.price { width: 18%; }
        .quotation-table thead { display: table-header-group; }
        .quotation-table th { border: 1px solid #222; padding: 2.5mm 2mm; background: #c8d9ec; color: #444; font-size: 11pt; text-align: center; }
        .quotation-table td { border-left: 1px solid #333; border-right: 1px solid #333; padding: 2.2mm 2.5mm; vertical-align: top; }
        .quotation-table tr:last-child td { border-bottom: 1px solid #333; }
        .number-cell { text-align: center; color: #555; }
        .price-cell { text-align: right; white-space: nowrap; }
        .price-cell span { display: block; color: #555; font-size: 8.5pt; }
        .price-cell strong { display: block; margin-top: 1mm; font-size: 10pt; }
        .category-heading-row td { padding-top: 3.5mm; padding-bottom: 2mm; font-size: 11pt; }
        .quote-item-row { break-inside: avoid; page-break-inside: avoid; }
        .supply-quote-row td { padding-top: 3mm; padding-bottom: 3mm; }
        .supply-quote-row ul { margin: 2mm 0 0 5mm; padding-left: 5mm; }
        .supply-quote-row li { margin: 1.2mm 0; }
        .empty-quote-row td { height: 22mm; color: #777; }
        .thank-you { border: 1px solid #555; border-top: 0; padding: 3mm; color: #6ca4e8; font-style: italic; text-align: center; }
        .totals { width: 55%; margin-left: auto; margin-top: 0; }
        .totals th, .totals td { padding: 2.4mm 3mm; font-size: 11pt; }
        .totals th { text-align: right; }
        .totals td { width: 40mm; background: #71d0f3; font-weight: 700; }
        .totals .total th, .totals .total td { border-top: 1px solid #222; font-size: 12pt; }
        .terms-page { break-before: page; page-break-before: always; padding-top: 2mm; }
        .terms-page h2 { margin: 0 0 2mm; font-size: 12pt; }
        .terms-list { margin: 0; padding-left: 7mm; font-size: 9pt; line-height: 1.28; }
        .terms-list > li { margin: 1.1mm 0; padding-left: 1.5mm; }
        .liability-title { font-weight: 700; }
        .liability-list { margin: 1.5mm 0 0 7mm; padding-left: 4mm; }
        .liability-list li { margin: 1.2mm 0; }
        .indemnity { margin: 2mm 0 0; font-size: 9pt; }
        .footer-rule { border: 0; border-top: 1px solid #aaa; margin: 5mm 0; }
        .quote-footer { display: grid; grid-template-columns: 1fr 1fr; gap: 20mm; font-size: 10pt; }
        .quote-footer p { margin: 1mm 0; }
        .slogan { margin: 6mm 0 0; color: #d20d0d; font-size: 17pt; font-style: italic; font-weight: 700; text-align: center; }
        @media screen {
          body { background: #e9e9e9; padding: 18px; }
          .document { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 12mm 13mm; background: #fff; box-shadow: 0 8px 30px rgba(0,0,0,.14); }
          .terms-page { padding-top: 16mm; }
        }
      </style>
    </head>
    <body>
      <main class="document">
        <header class="quote-header">
          <img class="logo" src="${escapeHtml(logoUrl)}" alt="Atlas Tiling and Bathroom Renovations" />
          <div class="company-block">
            <h1>Quotation</h1>
            <h2>Atlas Tiling</h2>
            <p><strong>Licence:</strong>&nbsp;&nbsp; CPC 31311</p>
            <p><strong>Insurance:</strong>&nbsp;&nbsp; 2674838</p>
            <p><strong>ABN:</strong>&nbsp;&nbsp; 52 660 525 413</p>
            <p>Mill Point Road,<br />South Perth WA 6152</p>
          </div>
        </header>

        <section class="meta-customer">
          <div class="meta-lines">
            <p><span class="label">Date:</span> ${escapeHtml(quoteDate)}</p>
            <p><span class="label">Quotation No:</span> ${escapeHtml(quoteNumber)}</p>
          </div>
          <div class="customer-lines">
            <p><span class="label">To:</span> ${escapeHtml(customerName)}</p>
            <p><span class="label">Mob:</span> ${escapeHtml(mobile)}</p>
            <p><span class="label">Email:</span> ${escapeHtml(email)}</p>
            <p><span class="label">Add:</span> ${escapeHtml(address)}</p>
          </div>
        </section>

        <table class="quotation-table">
          <colgroup><col class="number" /><col class="description" /><col class="price" /></colgroup>
          <thead><tr><th>Number</th><th>Description</th><th>Price</th></tr></thead>
          <tbody>${buildQuoteRows()}</tbody>
        </table>
        <div class="thank-you">Thank you for the opportunity of pricing this work for you.... Sam</div>

        <table class="totals">
          <tr><th>Sub Total</th><td>${currency.format(totals.subtotal)}</td></tr>
          <tr><th>GST</th><td>${currency.format(totals.gst)}</td></tr>
          <tr class="total"><th>Total</th><td>${currency.format(totals.total)}</td></tr>
          <tr><th>Deposit Required 05%</th><td>${currency.format(totals.deposit)}</td></tr>
        </table>

        <section class="terms-page">
          <h2>TERMS AND CONDITIONS:</h2>
          <ul class="terms-list">
            <li>If the quote is accepted, a 5% deposit will be required before commencement of work.</li>
            <li>Removal of waste is either by the Client or as agreed by quotation with the Company.</li>
            <li>Door height adjustment after tiling is not included unless the Client asks for it to be included.</li>
            <li>Any changes or additions will be charged accordingly.</li>
            <li>Payment is required progressively based on the value of work completed at each stage or lesser amount of work completed.</li>
            <li>Full payment for the shower screen must be received before production begins, as manufacturing can only commence when it is paid in full.</li>
            <li>Final payment must be paid upon completion, except for a shower screen that must be paid in full before production commences.</li>
            <li>All materials remain the property of Atlas Tiling until the Final Invoice is paid.</li>
            <li>Prices in this quotation are valid for 30 days from the date of the quotation.</li>
            <li>If the Client cancels before the job commences, the deposit is non-refundable. The deposit secures the booking and covers preliminary expenses, including materials, contractor scheduling and reserved project resources.</li>
            <li>
              <span class="liability-title">1. Access and Wall Damage Liability:</span>
              <ol class="liability-list">
                <li>The Client acknowledges that plumbing services, demolition, electrical or carpentry work may require access behind walls, floors or ceilings.</li>
                <li>While the Contractor will take reasonable care, working on plasterboard, single-skin brickwork or tiled walls can cause inherent damage, including chipping, cracking or breakage on the opposite side of the wall.</li>
                <li>The Contractor is not responsible for structural or cosmetic damage to finished surfaces, including painting, tiling or wallpapering, when accessing plumbing services.</li>
                <li>Repair or restoration of damaged areas, including the opposite side of the wall, is not included in the original quote and is the Client's responsibility and expense.</li>
              </ol>
            </li>
          </ul>
          <p class="indemnity">1.5 The Client indemnifies the Contractor against all claims and costs arising from such damage, unless caused by the proven negligence or wilful misconduct of the Contractor.</p>

          <hr class="footer-rule" />
          <footer class="quote-footer">
            <div>
              <p><strong>Atlas Tiling and Bathroom Renovations</strong></p>
              <p>Bank: &nbsp;NAB</p>
              <p>BSB: &nbsp;&nbsp;086-479</p>
              <p>ACC: &nbsp;&nbsp;56 313 3229</p>
            </div>
            <div>
              <p><strong>Sam</strong></p>
              <p>Mob: &nbsp;0450 418 618</p>
              <p>Email: &nbsp;atlastiling@live.com.au</p>
              <p>Web: &nbsp;atlasbathroomrenovations.com.au</p>
            </div>
          </footer>
          <div class="slogan">PERFECTION IS OUR STANDARD</div>
        </section>
      </main>
    </body>
  </html>`;
}

function openPrintableQuote() {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    window.alert("Please allow pop-ups for this website, then click Create PDF again.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(buildPrintableQuote());
  printWindow.document.close();
  printWindow.addEventListener("load", () => {
    window.setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 350);
  });
}

categoryStack.addEventListener("change", (event) => {
  const card = event.target.closest(".category-card");
  if (!card) return;
  const category = getCategory(card.dataset.categoryId);

  if (event.target.matches(".category-select")) {
    setCategoryType(category, event.target.value);
    renderCategories();
    return;
  }

  if (event.target.matches(".work-select")) {
    const row = event.target.closest(".work-row");
    const item = getWorkItem(category, row.dataset.workId);
    item.selected = event.target.checked;
    if (item.selected && !item.quantity) item.quantity = "1";
    row.querySelector(".work-quantity").value = item.quantity;
    refreshWorkRow(row, item);
    refreshTotals();
    return;
  }

  if (event.target.matches(".supply-select")) {
    const row = event.target.closest(".supply-row");
    const item = getSupplyItem(category, row.dataset.supplyId);
    item.selected = event.target.checked;
    row.classList.toggle("is-selected", item.selected);
  }
});

categoryStack.addEventListener("input", (event) => {
  const card = event.target.closest(".category-card");
  if (!card) return;
  const category = getCategory(card.dataset.categoryId);

  if (event.target.matches(".work-quantity, .work-price, .custom-work-description")) {
    const row = event.target.closest(".work-row");
    const item = getWorkItem(category, row.dataset.workId);

    if (event.target.matches(".work-quantity")) item.quantity = event.target.value;
    if (event.target.matches(".work-price")) item.price = event.target.value;
    if (event.target.matches(".custom-work-description")) item.description = event.target.value;

    refreshWorkRow(row, item);
    refreshTotals();
    return;
  }

  if (event.target.matches(".supply-description")) {
    const row = event.target.closest(".supply-row");
    const item = getSupplyItem(category, row.dataset.supplyId);
    item.description = event.target.value;
    row.querySelector(".supply-print-text").textContent = item.description;
    resizeTextarea(event.target);
  }
});

categoryStack.addEventListener("click", (event) => {
  const card = event.target.closest(".category-card");
  if (!card) return;
  const category = getCategory(card.dataset.categoryId);

  if (event.target.closest(".remove-category")) {
    categories = categories.filter((item) => item.id !== category.id);
    if (categories.length === 0) addBlankCategory();
    else renderCategories();
    return;
  }

  if (event.target.closest(".add-work-item")) {
    category.workItems.push(createWorkItem("", true));
    renderCategories();
    const newCard = document.querySelector(`[data-category-id="${category.id}"]`);
    newCard.querySelector(".custom-work-description:last-of-type")?.focus();
    return;
  }

  if (event.target.closest(".delete-work")) {
    const row = event.target.closest(".work-row");
    category.workItems = category.workItems.filter((item) => item.id !== row.dataset.workId);
    renderCategories();
    return;
  }

  if (event.target.closest(".add-supply-item")) {
    category.supplyItems.push(createSupplyItem("", true));
    renderCategories();
    const newCard = document.querySelector(`[data-category-id="${category.id}"]`);
    const textareas = newCard.querySelectorAll(".supply-description");
    textareas[textareas.length - 1]?.focus();
    return;
  }

  if (event.target.closest(".delete-supply")) {
    const row = event.target.closest(".supply-row");
    category.supplyItems = category.supplyItems.filter((item) => item.id !== row.dataset.supplyId);
    renderCategories();
  }
});

document.querySelector("#add-category").addEventListener("click", addBlankCategory);
document.querySelector("#print-quote").addEventListener("click", openPrintableQuote);
includeGst.addEventListener("change", refreshTotals);

const now = new Date();
const localDate = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");
document.querySelector("#quote-date").value = localDate;

addBlankCategory();
