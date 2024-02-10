// 유저가 값을 입력
// "+" 버튼 클릭 시, 할일이 추가
// "Delete" 버튼 클릭 시, 할일이 삭제
// "Check" 버튼 클릭 시, 할일이 종료, 텍스트에 밑줄
// "In-progress", "Done" 탭을 누르면, 언더바가 이동
// "Done" 탭은 끝난 아이템만, "In-progress" 탭은 진행중인 아이템만 표시
// "All" 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask)

function addTask() {
    let taskContent = taskInput.value
    taskList.push(taskContent)
    render();
}

function render() {
    let resultHTML = "";
    for(let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="task">
            <div>${taskList[i]}</div>
            <div>
                <button>Check</button>
                <button>Delete</button>
            </div>
        </div>`;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}