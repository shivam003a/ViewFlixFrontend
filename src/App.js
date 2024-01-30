import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Search from './components/Search'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Video from './components/Video';
import Upload from './components/Upload';

function App() {

	return (
		<div className='wrapper'>
			<div className='navigation'>
				<Navbar />
			</div>
			<div className='content'>
				<div className='search'><Search /></div>
				<Routes>
					<Route path='/'>
						<Route index element={<Home type="random"/>} />
						<Route path='subscribed' element={<Home type="subscribed"/>} />
						<Route path='search' element={<Home type="search"/>} />
						<Route path='signin' element={<Login/>} />
						<Route path='signup' element={<Register/>} />
						<Route path='video/:id' element={<Video />} />
						<Route path='upload' element={<Upload />} />
					</Route>	
				</Routes>
			</div>
		</div>
	);
}

export default App;
