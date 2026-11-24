import { createTask, changeStatus, filterTasks, summarize, loadTasks, saveTasks, STATUSES } from './domain.js';
const $ = selector => document.querySelector(selector);
let tasks = [];
let storageReady = true;
try { tasks = loadTasks(localStorage); } catch { storageReady = false; $('#message').textContent = 'Não foi possível ler os dados locais. Os dados existentes foram preservados. Verifique as permissões ou os dados do navegador antes de cadastrar.'; }
function commit(next) {
  if (!storageReady) throw new Error('Armazenamento indisponível. Os dados existentes foram preservados.');
  saveTasks(localStorage, next);
  tasks = next;
  render();
}
function render() {
  Object.entries(summarize(tasks)).forEach(([key, value]) => { $(`#${key}`).textContent = value; });
  const visible = filterTasks(tasks, { query: $('#query').value, status: $('#status-filter').value, priority: $('#priority-filter').value });
  $('#count').textContent = `${visible.length} de ${tasks.length} tarefas`;
  $('#list').replaceChildren();
  if (!visible.length) {
    const empty = document.createElement('div'); empty.className = 'empty';
    const title = document.createElement('b'); title.textContent = tasks.length ? 'Nenhuma tarefa encontrada' : 'Tudo começa com uma tarefa';
    const hint = document.createElement('span'); hint.textContent = tasks.length ? 'Ajuste a busca ou os filtros.' : 'Cadastre sua primeira demanda no formulário.';
    empty.append(title, hint); $('#list').append(empty);
  }
  for (const task of visible) {
    const row = document.createElement('article'); row.className = 'task';
    const details = document.createElement('div'); const title = document.createElement('h3'); title.textContent = task.title;
    const meta = document.createElement('p'); meta.textContent = task.owner;
    const badge = document.createElement('span'); badge.className = `badge ${task.priority === 'Alta' ? 'high' : ''}`; badge.textContent = task.priority; meta.append(badge); details.append(title, meta);
    const select = document.createElement('select'); select.setAttribute('aria-label', `Status de ${task.title}`);
    STATUSES.forEach(status => { const option = document.createElement('option'); option.textContent = status; option.selected = status === task.status; select.append(option); });
    select.addEventListener('change', () => { try { commit(changeStatus(tasks, task.id, select.value)); $('#message').textContent = 'Status atualizado e salvo.'; } catch (error) { select.value = task.status; $('#message').textContent = `Não foi possível salvar: ${error.message}`; } });
    row.append(details, select); $('#list').append(row);
  }
}
$('#task-form').addEventListener('submit', event => {
  event.preventDefault();
  try { commit([...tasks, createTask(Object.fromEntries(new FormData(event.currentTarget)))]); event.currentTarget.reset(); $('#message').textContent = 'Tarefa cadastrada e salva. Se necessário, limpe os filtros para visualizá-la.'; $('#title').focus(); }
  catch (error) { $('#message').textContent = `Não foi possível salvar: ${error.message}`; }
});
['#query', '#status-filter', '#priority-filter'].forEach(selector => $(selector).addEventListener('input', render));
render();
