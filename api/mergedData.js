import { getListTasks, getSingleTask, deleteTask } from './taskData';
import { deleteList, getBoardList, getSingleList } from './listData';
import { deleteSingleBoard } from './boardData';

const viewTaskDetails = (taskFirebaseKey) => new Promise((resolve, reject) => {
  getSingleTask(taskFirebaseKey)
    .then((taskObject) => {
      getSingleList(taskObject.list_id)
        .then((listObject) => {
          resolve({ listObject, ...taskObject });
        });
    }).catch((error) => reject(error));
});

const viewListDetails = (listFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleList(listFirebaseKey), getListTasks(listFirebaseKey)])
    .then(([listObject, listTasksArray]) => {
      resolve({ ...listObject, tasks: listTasksArray });
    }).catch((error) => reject(error));
});

const deleteListTasks = (listId) => new Promise((resolve, reject) => {
  getListTasks(listId).then((tasksArray) => {
    console.warn(tasksArray, 'List Tasks');
    const deleteTaskPromises = tasksArray.map((task) => deleteTask(task.firebaseKey));

    Promise.all(deleteTaskPromises).then(() => {
      deleteList(listId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteBoardLists = (boardId) => new Promise((resolve, reject) => {
  getBoardList(boardId).then((listArray) => {
    console.warn(listArray, 'Project Board');
    const deleteListPromises = listArray.map((list) => deleteList(list.firebaseKey));

    Promise.all(deleteListPromises).then(() => {
      deleteSingleBoard(boardId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewTaskDetails, viewListDetails, deleteListTasks, deleteBoardLists,
};
