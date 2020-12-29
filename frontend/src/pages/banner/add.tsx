import { Button, Input } from 'antd';
import Axios from 'axios';
import withAuth from 'hocs/withAuth';
import React from 'react';


function AddBannerPage(){
  const [title, setTitle] = React.useState('');
  const [src, setSrc] = React.useState('');

  function handleSubmit(){

    Axios.put(`/addBanner`, {
      title,
      img_src: src,
    })
  }
  return (
    <div style={{width: '480px'}}>

      <Input value={title} onChange={(e)=>setTitle(e.target.value)} />
      <Input value={src} onChange={(e) => setSrc(e.target.value)} />

      <img src={src} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
};

export default withAuth(AddBannerPage);