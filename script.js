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
document.querySelector("#print-quote").addEventListener("click", () => window.print());
includeGst.addEventListener("change", refreshTotals);

const now = new Date();
const localDate = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");
document.querySelector("#quote-date").value = localDate;

addBlankCategory();
