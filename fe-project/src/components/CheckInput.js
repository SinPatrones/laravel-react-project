const CheckInput = ({status, onChange}) => {

  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="onlyCompleted"
             checked={status} onChange={onChange}/>
      <label className="form-check-label" htmlFor="onlyCompleted">
        See only task completed
      </label>
    </div>
  );
};

export default CheckInput;
