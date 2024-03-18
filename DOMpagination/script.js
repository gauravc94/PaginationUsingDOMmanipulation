const h1 = document.createElement('h1')
h1.textContent = 'Employees'
document.body.appendChild(h1)


const employeesTable = document.createElement('table')
employeesTable.id = 'employeesTable'
employeesTable.innerHTML = '<thead><tr><th>ID</th><th>Name</th><th>Email</th></tr></thead>'

const tbody = document.createElement('tbody')
tbody.id = 'employeesTbody'
employeesTable.appendChild(tbody)

document.body.appendChild(employeesTable)


const unorderedList = document.createElement('ul')
unorderedList.id = 'pagination'
document.body.appendChild(unorderedList)


function displayData(startIndex, endIndex, data) {
    const employeesTBody = document.getElementById('employeesTbody')
    employeesTBody.innerHTML = ''

    for (let i = startIndex; i < endIndex; i++) {
        const employee = data[i]
        if (employee) {
            const tr = document.createElement('tr')
            tr.innerHTML = `<td>${employee.id}</td><td>${employee.name}</td><td>${employee.email}</td>`
            employeesTBody.appendChild(tr)
        }
    }
}

function updatePagination(currentPage, data) {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage)
    const paginationUL = document.getElementById('pagination')
    paginationUL.innerHTML = ''


    // Prev link
    const prevListItem = document.createElement('li')
    const prevLink = document.createElement('a')
    prevLink.href = '#';
    prevLink.textContent = 'Prev'

    prevLink.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--

            displayData((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage, data)
            updatePagination(currentPage, data)
        }
    })

    prevListItem.appendChild(prevLink)
    paginationUL.appendChild(prevListItem)


    // Page Links
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li')
        const link = document.createElement('a')
        link.href = '#'
        link.textContent = i

        link.addEventListener('click', () => {
            currentPage = i

            displayData((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage, data)
            updatePagination(currentPage, data)
        })

        li.appendChild(link)
        paginationUL.appendChild(li)
    }


    // Next Link
    const nextListItem = document.createElement('li')
    const nextLink = document.createElement('a')
    nextLink.href = '#'
    nextLink.textContent = 'Next'

    nextLink.addEventListener('click', () => {
        if (currentPage < totalPages) {

            currentPage++

            displayData((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage, data)
            updatePagination(currentPage, data)
        }
    })

    nextListItem.appendChild(nextLink)
    paginationUL.appendChild(nextListItem)
}


function fetchData() {
    fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
        .then(res => res.json())
        .then(data => {
            let currentPage = 1

            displayData(0, 10, data)
            updatePagination(currentPage, data)
        })
        .catch(err => console.error("Error fetching employees data:", err))
}

fetchData()