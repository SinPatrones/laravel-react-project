const Alert = ({text}) => {
  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-md-6">
        <div className="alert alert-primary" role="alert">
          {text}
        </div>
      </div>
    </div>
  );
};

export default Alert;
