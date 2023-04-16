// Aufgabe 3.1.1
function notGoodGrades(grades) {
    return grades = grades.filter((element) => {
        let gradesCleaned = element.grade.replace(",", ".");
        gradesCleaned = parseFloat(gradesCleaned);
        return gradesCleaned >= 3.0;
    })

}

// Aufgabe 3.1.2
function gradeOverview(students, grades) {
    return students = students.map((element) => {
        element = {
            student: element,
            grades: grades.filter(gradeElement => gradeElement.matrikelnummer == element.matrikelnummer)
        };
        return element
    })
}

// Aufgabe 3.1.3
function duplicateStudents(students) {
    // only duplicated matrklNr.
    let matrikelnummer = students.map((element) => element.matrikelnummer)
    matrikelnummer = matrikelnummer.filter((element, index) => matrikelnummer.indexOf(element) !== index)

    return students = matrikelnummer.map((element) => {
        element = {
            matrikelnummer: element,
            students: students.filter(studentElement => element == studentElement.matrikelnummer)
        };
        return element;
    })
}

// Aufgabe 3.1.4
function invalidGrades(grades) {

    let gr = grades
        .map((s) => {
            s = {
                matrikelnummer: s.matrikelnummer,
                grades: grades.filter(gradeElement => s.matrikelnummer == gradeElement.matrikelnummer && s.course == gradeElement.course)
            };
            return s;
        })
    .filter((e) => e.grades.length > 1)
    .map((s) => {
        s = {
            matrikelnummer: s.matrikelnummer,
            grades: [s.grades]
        }
        return s;
    })
    // .filter((grade, i, self) => i === self.findIndex((t) => (t.matrikelnummer === grade.matrikelnummer)))

    return gr;

}