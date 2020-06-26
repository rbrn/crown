import React from 'react';

const Input = (props) => (
  <input type="file" name="file-input" multiple {...props} />
)

const UploadDocuments = () => {

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    (e.target.files);
  }

  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        <div>
          <Input onChange={onChange} />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UploadDocuments;
