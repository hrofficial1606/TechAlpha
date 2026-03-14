import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

function Scanner(){

 useEffect(()=>{

  const scanner = new Html5QrcodeScanner(
    "reader",
    { fps:10, qrbox:250 }
  );

  scanner.render((text)=>{

   fetch(`/ticket/scan/${text}`)
     .then(res=>res.text())
     .then(alert);

  });

 },[]);

 return <div id="reader"></div>;

}

export default Scanner;