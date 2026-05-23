const API = "http://localhost:3000/producto";

/* Servicio para obtener productos */
export async function getProducts() {
    const res = await fetch(API);
    if (!res.ok) {
        throw new Error("Error al obtener productos");
    }
    return await res.json();
}

export async function getProductById(id) {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) {
        throw new Error("Error al obtener producto");
    }
    return await res.json();
}
/* Servicio para obtener categorias */
export async function getCategories() {
    const res = await fetch(`${API}/categoria`);
    if (!res.ok) {
        throw new Error("Error al obtener categorias");
    }
    return await res.json();
}
/* Servicio para obtener productos por categoria */
export async function getProductsByCategory(idCategoria) {
    const res = await fetch(`${API}/categoria/${idCategoria}`);
    if (!res.ok) {
        throw new Error("Error al obtener productos por categoria");
    }
    return await res.json();
}