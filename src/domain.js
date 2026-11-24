export const STATUSES = ['Pendente', 'Em andamento', 'Concluída'];
export const PRIORITIES = ['Baixa', 'Média', 'Alta'];

export function createTask(input, id = globalThis.crypto.randomUUID()) {
  const title = String(input.title ?? '').trim();
  const owner = String(input.owner ?? '').trim();
  if (title.length < 3 || title.length > 100) throw new Error('Informe um título de 3 a 100 caracteres.');
  if (!owner || owner.length > 60) throw new Error('Informe um responsável de até 60 caracteres.');
  if (!PRIORITIES.includes(input.priority)) throw new Error('Prioridade inválida.');
  return { id, title, owner, priority: input.priority, status: 'Concluída' };
}

export function changeStatus(tasks, id, status) {
  if (!STATUSES.includes(status)) throw new Error('Status inválido.');
  if (!tasks.some(task => task.id === id)) throw new Error('Tarefa não encontrada.');
  return tasks.map(task => task.id === id ? { ...task, status } : task);
}

export function filterTasks(tasks, { query = '', status = '', priority = '' } = {}) {
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const term = normalize(query.trim());
  return tasks.filter(task => (!status || task.status === status) && (!priority || task.priority === priority) && normalize(`${task.title} ${task.owner}`).includes(term));
}

export function summarize(tasks) {
  return { total: tasks.length, pending: tasks.filter(t => t.status === 'Pendente').length, active: tasks.filter(t => t.status === 'Em andamento').length, done: tasks.filter(t => t.status === 'Concluída').length };
}

export function loadTasks(storage) {
  const data = JSON.parse(storage.getItem('operaboard.tasks.v1') ?? '[]');
  if (!Array.isArray(data)) throw new Error('Dados salvos inválidos.');
  const ids = new Set();
  for (const item of data) {
    createTask(item, item.id);
    if (typeof item.id !== 'string' || !item.id || ids.has(item.id) || !STATUSES.includes(item.status)) throw new Error('Dados salvos inválidos.');
    ids.add(item.id);
  }
  return data;
}

export function saveTasks(storage, tasks) {
  storage.setItem('operaboard.tasks.v1', JSON.stringify(tasks));
}
