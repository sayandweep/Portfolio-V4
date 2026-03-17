import { repos } from './const'

function Repos() {
  return (
    <div className="container" id='blogs'>
        <div className="blogs">
          {repos.map((repo) => (
            <a href={repo.link} key={repo.name} target="_blank">
              <div className='postBody'>
                <div className='title'>{repo.name}</div>
                <div className='other'>{repo.about}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
  )
}

export default Repos