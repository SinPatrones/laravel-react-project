const TaskItem = ({id, name, completed, toggleTaskStatus, onDelete}) => {
  return (
    <div className="card m-1">
      <div className="card-body">
        <p className={completed ? 'text-decoration-line-through' : ''}>
          {name}
        </p>
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6 col-md-4 col-lg-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id={`task${id}`}
                     checked={completed} onChange={toggleTaskStatus}/>
              <label className="form-check-label" htmlFor={`task${id}`}>
                Completed
              </label>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2">
            <button className='btn btn-sm btn-danger m-2' onClick={onDelete}>ELIMINAR</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskItem;
