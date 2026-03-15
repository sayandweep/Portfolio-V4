import { sites } from "./const"


function Websites() {
  return (
      <div className="container" id='blogs'>
        <div className="blogs">
          {sites.map((site) => (
            <a href={site.link} key={site.name} target="_blank">
              <div className='postBody'>
                <div className='title'>{site.name}</div>
                <div className='other'>{site.type}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
  )
}

export default Websites