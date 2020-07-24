import React from 'react';
import useFileHandlers from './file-handler';

const Input = (props) => (
  <input
    type="file"
    name="input"
    multiple
    {...props}
  />
)

const UploadDocuments = () => {
  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
  } = useFileHandlers()

  return (
    <div className="container" style={{marginBottom: '10px'}}>
      <form className="form" onSubmit={onSubmit}>
        <div>
          <Input onChange={onChange} />
          <button type="submit">Submit</button>
        </div>
        <div>
          {files.map(({ file, src, id }, index) => (
            <div key={`thumb${index}`} className="thumbnail-wrapper">
              <img className="thumbnail" src={src} alt="" />
              <div className="thumbnail-caption">{file.name}</div>
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

export default UploadDocuments;
