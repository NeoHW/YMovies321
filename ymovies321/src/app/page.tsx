import Image from 'next/image'
import addData from './firebase/firestore/addData'
import getData from './firebase/firestore/getData'


export default function Home() {
  addData("users", "TJlfmor2MUtrbfK0wHA9", {"name" : "lengkhai"})

  return (
    <h1> login </h1>
  )
}
