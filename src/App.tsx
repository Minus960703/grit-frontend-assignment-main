import { Routes, Route      } from 'react-router-dom'
import { useEffect          } from 'react'
import NotFoundPage           from './pages/not-found'
import UserPage               from './pages/user'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  // useEffect(() => {
  //   fetch('/api/users?page=2')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <Routes>
        <Route path='/' element={<>
          <div
            style={{
              whiteSpace: 'pre-line',
            }}
          >
            {`추가적인 페이지를 만들어 과제를 진행해 주세요.
            아래는 저희팀에서 제시드리는 UX 디자인입니다.
            더 좋은 UI / UX 디자인을 제안하셔도 좋습니다.
            하단의 '과제로  이동하기' 눌러서 과제로 이동할 수 있게 만들어주세요.
            예시 API는 /api/users?page=2 입니다.
            `}
          </div>

          <div
            style={{
              width: 400,
            }}
          >
            <img
              style={{
                width: '100%',
                height: 'auto',
              }}
              src="/example.png"
              alt="example"
            />
          </div>

          <div>
            <Link to='/user'>과제로 이동하기</Link>
          </div>
        </>} />
        <Route path='/user' element={<UserPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
