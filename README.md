# Merch Plan Builder v2

A web app prototype for retail merchandising plans.

## Two workflows

### Use Type Mode
Click a space to cycle through categories/colors:
- Food + Beverage
- Fitness
- Neighborhood Services
- Soft Goods
- Medical / Wellness
- Entertainment
- Home / Design
- TBD

### Retailer Mode
Drag a retailer or concept from the sidebar onto a space. The space automatically gets:
- Retailer/concept name
- Category/use type
- Category color

## Run it

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Current features

- Upload a site plan image
- Add retail spaces
- Click spaces to assign use types
- Drag retailers/concepts onto spaces
- Add new retailers/concepts to the sidebar
- Edit space ID, category, retailer/concept, and notes
- Auto-save to browser local storage
- Export the plan as a PNG

## Next features to add

- Drag/resize spaces directly on the plan
- Polygon shapes instead of only rectangles
- Project save/load
- PDF upload
- Client share links
