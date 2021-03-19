import { APIDemands } from './baseService';

export async function getCategories() {
  try {
    const response = await APIDemands.get('category');
    return response;
  } catch (error) {
    console.error(`Não foi possível listar as categorias.${error}`);
  }
  return null;
}

// Está no ReacModal
export async function createCategory(name, description, color) {
  try {
    const response = await APIDemands.post('category/create', {
      name,
      description,
      color,
    });
    console.log(response.data);
    if (response.data.status) {
      alert('Preencha todos os campos para poder criar uma nova categoria');
    }
  } catch (error) {
    alert('Não foi possível criar a nova categoria, tente novamente.');
  }
}

export async function updateCategory(name, description, color, id) {
  try {
    const response = await APIDemands.put(`category/update/${id}`, {
      name,
      description,
      color,
    });
    console.log(response.data);
    if (response.data.status) {
      alert('Preencha todos os campos para poder criar uma nova categoria');
    }
  } catch (error) {
    alert('Não foi possível atualizar a categoria, tente novamente.');
  }
}
