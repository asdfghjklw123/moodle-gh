import React, { useState } from "react";
import "./task.css";
import { NavLink } from "react-router-dom";
import grad_cap from "./grad-cap.svg";
import white_cap from "./white-cap.svg"


function Task(props) {
  let data = props.course.un_courseData[0]
  const courseData = data.lectures;


const [selectedItem, setSelectedItem] = useState(1);
const [selectedCourseTitle, setSelectedCourseTitle] = useState(courseData[0].title);

const handleItemClick = (index) => {
    setSelectedItem(index);
    setSelectedCourseTitle(courseData[index - 1].title);
};

  const [draggedOver, setDraggedOver] = useState(false);

  const handleFiles = (files) => {
    console.log(`Получено файлов: ${files.length}`); 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  return (
    <div className="task-main">
      <div className="container">
        <div className="main">
          <div className="task-text">
            <div className="textnav">
              <NavLink to="/" className="text1">
                Главная →
              </NavLink>
              <NavLink to="/course" className="text1-journal">
                Курс →
              </NavLink>
              <div className="text-vkladka">{data.title}</div>
            </div>
            <div className="text2" style={{'textTransform': 'uppercase'}}>{data.title}</div>
          </div>
          <div className="main-task-menu">
            <div className="task-sidebar">
            {data.lectures.map((l, index) => (
              <NavLink key={index} to="/course" className="sidebar-card" id={`task-card${index + 1}`}>
                <div className="sidebar-img">
                  <img src={white_cap} alt="" />
                </div>
                <div className="sidebar-text">{l.title}</div>
              </NavLink>
            ))}

            </div>
            <div className="task-menu">
              <div className="text2" id="otvet2">
                {data.lectures[0].title}
              </div>
              <div className="text2" id="otvet">
                СОСТОЯНИЕ ОТВЕТА
              </div>
              <table className="task-table">
                <tbody>
                  <tr>
                    <td className="table-label">Дата назначения задания:</td>
                    <td>{data.lectures[0].task.date_start}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Дата завершения задания:</td>
                    <td>{data.lectures[0].task.date_end}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Статус ответа:</td>
                    <td>В процессе</td>
                  </tr>
                  <tr>
                    <td className="table-label">Оценка:</td>
                    <td>Без оценки</td>
                  </tr>
                  <tr>
                    <td className="table-label">Оставшееся время:</td>
                    <td>3 дня</td>
                  </tr>
                  <tr>
                    <td className="table-label">Прикрепленный файл:</td>
                    <td>file</td>
                  </tr>
                </tbody>
              </table>
              <div className={`text2 ${draggedOver ? 'dragged-over' : ''}`} id="otvet">
                ВАШ ОТВЕТ
                <div id="dropZone" className={`drop-zone ${draggedOver ? 'dragged-over' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                  <div className="drop-zone-icons">
                    <svg className="upload-icon" viewBox="0 0 24 24" fill="#FF5A5F">
                      <path d="M12 6l-4 4h3v4h2v-4h3m-10 6v2h12v-2h-12z"></path>
                    </svg>
                  </div>
                  <span className="drop-zone-text">Перетащите файлы сюда или нажмите, чтобы загрузить</span>
                </div>
                <input type="file" multiple style={{ display: 'none' }} onChange={handleFileInputChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
