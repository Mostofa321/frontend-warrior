# Frontend Warrior – 3-in-1 Task

This is a **Frontend Engineering Assessment Project** built with **Next.js 15 App Router**, **Tailwind CSS**, and **React Konva**.  

It contains 3 main pages:

1. **/tasks** – Kanban Task Board  
2. **/dashboard** – Task Analytics Dashboard with charts  
3. **/annotate** – Image Annotation Tool

---

## **Features**

### **1. Tasks Page**
- Kanban board for tasks
- Create, update, and move tasks between columns
- Task filter by date
- Drag-and-drop support
- Persistent in LocalStorage

### **2. Dashboard Page**
- Charts showing task statistics:
  - Tasks per status (Bar chart)
  - Tasks per day (Line chart)
  - Task distribution (Pie chart)
- Responsive and interactive
- Live data from the task board

### **3. Annotate Page**
- Display multiple images for annotation
- Polygon drawing for annotations
- Hover to highlight polygons
- Click to select a polygon
- Delete selected polygon with a button
- Label/tag polygons when creating them
- Responsive scaling for all screen sizes
- Persistent in LocalStorage

---

## **Tech Stack**
- **Next.js 15 (App Router)**
- **Tailwind CSS**
- **Zustand** (State Management)
- **React-Konva** (Canvas Drawing)
- **use-image** (Image Loader for Konva)
- **Recharts** (Charts in Dashboard)

---

## **Setup Instructions**

```bash
# 1. Clone Repository
git clone https://github.com/Mostofa321/frontend-warrior.git
cd frontend-warrior

# 2. Install Dependencies
npm install

# 3. Run Development Server
npm run dev
# App will run at http://localhost:3000

# 4. Build for Production
npm run build
npm start
