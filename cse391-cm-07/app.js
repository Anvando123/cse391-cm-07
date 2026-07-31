function lineTotal(p) {
  return p.price * p.qty;
}

function inventoryValue(list) {
  return list.reduce((sum, p) => sum + lineTotal(p), 0);
}

function stockLevel(qty) {
  if (qty >= 5) return "Du";
  if (qty >= 2) return "Sap het";
  return "Can nhap";
}

function findProductBySKU(list, sku) {
  return list.find(p => p.sku === sku);
}
function countByCategory(list, category_id) {
  return list.filter(p => p.category_id === category_id).length;
}
console.log(inventoryValue(products)); // PHẢI ra 41380000
console.log(stockLevel(10), stockLevel(3), stockLevel(1)); // Du Sap het Can nhap 

function updateStats() {
    const e1 = document.querySelector("#stats");
    if (!e1) return;
    const total = inventoryValue(products);
    e1.textContent = `So san pham =   ${products.length}  Tong gia tri kho =  ${total}`;
}
//Bao cao
function reportCategories() {

    const rows = categories.map((cat) => {

        const subset = products.filter((p) => p.category_id === cat.id);

        return {
            "Danh muc": cat.name,
            count: subset.length,
            value: inventoryValue(subset)
        };

    });

    console.table(rows);
}

function categoryName(id) {
    const c = categories.find((cat) => cat.id === id);
    return c ? c.name : "?";
}

function render(list) {
    const grid = document.querySelector('[data-testid="cm-product-table"]');
    grid.innerHTML = "";

    for (const p of list) {
        const card = document.createElement("article");
        card.className = "cm-card";
        card.dataset.sku = p.sku;
        card.dataset.testid = "cm-product-row";

        const h3 = document.createElement("h3");
        h3.textContent = p.name;
        
        const cat = document.createElement("p");
        cat.className = "cm-card-cat";
        cat.textContent = categoryName(p.category_id);

        const price = document.createElement("p");
        price.className = "cm-card-price";
        price.textContent = String(p.price);

        const stock = document.createElement("p");
        stock.className = "cm-stock";
        stock.textContent = stockLevel(p.qty);

        card.append(h3, cat, price, stock);
        grid.appendChild(card);
    }

    const count = document.querySelector('[data-testid="cm-visible-count"]');
    if (count) {
        count.textContent = `Hien thi: ${list.length} san pham`;
    }
}

let currentList = products;

const select = document.querySelector('[data-testid="cm-filter-category"]');

select.addEventListener('change', () => {
   const v = select.value;
   currentList = v === "all" ? products : products.filter(p => p.category_id === Number(v));
   render(currentList);
});

document.querySelector("#sort-price").addEventListener("click", () => {
    currentList.sort((a, b) => a.price - b.price);
    render(currentList);
});

const grid = document.querySelector('[data-testid="cm-product-table"]');
grid.addEventListener("click", (evt) => {
    const row = evt.target.closest(".cm-card");
    if(!row) return;
    console.log("Ban vua bam card", row.dataset.sku);
});


updateStats();
reportCategories();
render(currentList); 