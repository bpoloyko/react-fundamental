import { useState } from 'react/cjs/react.development';
import './App.css';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { mockedCoursesList, mockedAuthorsList } from './constants';

function App() {
	const [isCreateTab, setIsCreateTab] = useState(false);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const onCreateAuthorHandle = (author) => {
		let authorNames = authors.map((author) => author.name);
		if (!authorNames.find((authorName) => author.name === authorName)) {
			setAuthors([...authors, author]);
		}
	};

	return (
		<>
			<Header className='header' userName='Boris' />
			{isCreateTab ? (
				<CreateCourse
					authors={authors}
					onCreateAuthor={(author) => onCreateAuthorHandle(author)}
					onCreateCourse={(course) => {
						setCourses([...courses, course]);
						setIsCreateTab(false);
					}}
				/>
			) : (
				<Courses
					onAddNewCourseClick={() => setIsCreateTab(true)}
					courses={courses}
					authors={authors}
				/>
			)}
		</>
	);
}

export default App;
