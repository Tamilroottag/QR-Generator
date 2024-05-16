import { useState } from "react"

export const QrCode = () => {
  const [img, setImg] = useState("")
  const [loading, setLoading] = useState(false)
  const [qrData, setQrData] = useState("www.youtube.com")
  const [qrsize, setqrsize] = useState("150")

  async function generatorQR() {
    setLoading(true)
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrData)}`;
      setImg(url)
    } catch (error) {
      console.log("Error generate QR Code", error);
    }finally{
      setLoading(false)
    }
  }

  function downloadQR() {
    fetch(img)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${qrData.split(".")}`;
      document.body.appendChild(link)
      link.click();
      document.body.removeChild(link)
    })
  }
  return (
    <div className="app-container">
        <h1>QR Code Generator</h1>
        {loading && <p>Please wait...</p>}
        {/* <img className="qr-image"  src={img}/> */ } 
        {img && <img src={img} className="qr-image"/>}
        <div>
            <label htmlFor="dataInput" className="input-lable">
                Data for QR code
            </label>
            <input value={qrData} type="text" id="dataInput" placeholder="Enter a URL link" onChange={(event) => setQrData(event.target.value)}/>
            <label htmlFor="sizeInput" className="input-lable">
                Image size (e.g : 150 , 250) : 
            </label>
            <input value={qrsize} type="text" id="sizeInput" placeholder="Enter a image size" onChange={(event) => setqrsize(event.target.value)}/>
            <button className="generate-button" disabled={loading} onClick={generatorQR}>Generate QR Code</button>
            <button className="download-button" onClick={downloadQR}>Download QR Code</button>
        </div>
        <p className="footer">Designed By <a href="https://react.dev/"><span>React Project</span></a></p>
    </div>
  )
}
