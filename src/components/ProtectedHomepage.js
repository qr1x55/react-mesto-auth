import Header from "./Header.js"
import Main from './Main.js'


export default function ProtectedHomepage({userEmail, ...props}) {
  return(
    <>
      <Header userEmail={userEmail}/>
      <Main
        name='main'
        {...props}
      />
    </>
  )
}