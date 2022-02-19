import React from 'react'
import css from "./leftmenu.module.css"
import Toolbar from './Toolbar'
import { useNavigate } from 'react-router';


function LeftMenu() {
  let navigate = useNavigate();
  function goHome(){
    navigate('/')
  }
  function goToHelp(){
    navigate('/help')
  }
  function goToProfile(){
    navigate('/profile')
  }
  const list = [
    {name: "home", onClick: goHome},
    {name: "help", onClick: goToHelp },
    {name: "profile", onClick: goToProfile}
  ]
  return (
    <div className={css.container}>
      <Toolbar list={list} type="primary" location={["vertical"]} />
    </div>
  )
}

export default LeftMenu