const Form = ({inputText, onChangeInput, onSubmit}) => {
  return (
    <form className="col-sm-11 col-md-8 col-lg-5 m-3 text-center">
      <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">TASK
        NAME</label>
      <input type="email" className="form-control" id="exampleFormControlInput1"
             placeholder="I have to..." value={inputText}
             onChange={evt => onChangeInput(evt.target.value)}/>
      <button className='btn btn-primary m-2' type='submit' onClick={onSubmit}
              disabled={inputText === ''}>AGREGAR
      </button>
    </form>
  );
};

export default Form;
