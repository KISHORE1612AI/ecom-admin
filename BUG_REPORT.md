Bug Report — E-Commerce Admin Dashboard
Product Filter Uses OR Instead of AND

Location: app/products/page.tsx, filter logic

Description: The filter condition uses || (OR) between search and category match. This means filtering by category alone shows all products that match the search term even if category doesn't match.

Expected: Both search and category filters should narrow results together using AND logic.

Fix: Change return matchSearch || matchCat to return matchSearch && matchCat

Duplicate Product ID on Add After Delete

Location: app/products/page.tsx, handleSave

Description: New product IDs are generated as P00${products.length + 1}. If a product is deleted, products.length decreases, causing the next added product to get an ID that may already exist.

Expected: IDs should be unique (e.g., UUID or max ID + 1).

Fix: Use Date.now() or a UUID library to generate unique IDs.

Pagination Page Counter Off-by-One

Location: app/orders/page.tsx

Description: currentPage initializes at 0 and is displayed as Page {currentPage + 1}. While display compensates, the "Prev" button logic and boundary checks all use raw currentPage, leading to confusion in edge cases.

Expected: Use 1-based page state or consistently handle 0-based internally.

Pagination Count Uses Unfiltered Data

Location: app/orders/page.tsx

Description: totalPages is computed from orders.length (all orders), not filtered.length. When a status filter or search is applied, the page count shown is incorrect.

Expected: totalPages = Math.ceil(filtered.length / perPage)

User Search Ignores Email Field

Location: app/users/page.tsx

Description: The search filter only checks u.name. Searching by email (e.g., "ravi@example.com") returns zero results even when the user exists.

Expected: Search should check both name and email.

Order Count Shown Using String Concatenation

Location: app/users/page.tsx

Description: u.orders + " orders" uses JS string coercion. If u.orders were a string type, this would output correctly but is fragile and inconsistent.

Expected: Use `${u.orders} orders` or String(u.orders) + " orders".

Conversion Rate Always Shows 100%

Location: app/analytics/page.tsx

Description: The formula is (deliveredOrders.length / deliveredOrders.length) * 100, which always returns 100%.

Expected: (deliveredOrders.length / orders.length) * 100

Order for Out-of-Stock Product in Data

Location: lib/data.ts

Description: ORD-1002 references "Running Shoes" which has stock: 0 and status: "out_of_stock". This creates a data inconsistency.

Expected: Data should reflect realistic business constraints.

Pagination Not Reset on Search Change

Location: app/orders/page.tsx

Description: When the status filter changes, setCurrentPage(0) is called. However, changing the search input does not reset pagination, potentially showing empty results.

Expected: Add setCurrentPage(0) in the search handler.

Edit Modal Retains Previous Form State on Cancel

Location: app/products/page.tsx

Description: If a user edits a product, cancels, and later opens the add modal, previous values may still appear because form state is not reset on close.

Expected: Reset form state when the modal closes.

Admin User Can Be Deactivated

Location: app/users/page.tsx

Description: The toggle action is available for all users, including administrators.

Expected: Disable the toggle for users with role === "admin".

Dashboard "Total Revenue" Is Actually Delivered Revenue

Location: app/page.tsx

Description: Revenue is calculated only from delivered orders, but the dashboard label says "Total Revenue".

Expected: Either include all revenue or rename the metric appropriately.

Redundant toFixed + Number Conversion

Location: app/analytics/page.tsx

Description: toFixed(0) returns a string and is later converted back to a number, causing unnecessary conversion and precision loss.

Expected: Use Math.round() and keep the value numeric.

Delete Product Has No Confirmation

Location: app/products/page.tsx

Description: Products are deleted immediately when the delete icon is clicked.

Expected: Display a confirmation dialog before deletion.

Cancelled Orders Can Still Be Changed

Location: app/orders/page.tsx

Description: Cancelled orders still display a status dropdown, allowing status modifications.

Expected: Cancelled orders should be locked and displayed as badges.

Inactive Users Counted in Dashboard Active Count

Location: app/page.tsx

Description: The dashboard card messaging is inconsistent between total users and active users.

Expected: Clearly distinguish total users from active users.

Discontinued Product Shows "Out of Stock" Badge

Location: app/products/page.tsx, stockBadge function

Description: Products marked as discontinued display an "Out of Stock" badge because only stock quantity is checked.

Expected: Check the product status before evaluating stock quantity.

No Validation for Negative Price or Stock

Location: app/products/page.tsx, modal form

Description: The form accepts negative values for price and stock.

Expected: Prevent saving products with negative values.

Prev Button Not Properly Disabled on First Page

Location: app/orders/page.tsx

Description: After filtering data, users may remain on an invalid page because pagination is not reset.

Expected: Reset page state whenever filters change.

Analytics Category Revenue Is Hardcoded

Location: app/analytics/page.tsx and lib/data.ts

Description: Category revenue values are static and do not update when order data changes.

Expected: Generate category revenue dynamically from order data or clearly mark it as static/demo data.