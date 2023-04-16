<template>
  <div
    :class='"alert " + alertStyle + " mt-3"' 
    role='alert'>
    
    <h4
      class='alert-heading'>
        {{ alertHeading }}
    </h4>
    <hr />

    <div class='row mb-3'>
      <div class='col-3 fw-bold'>Test</div>
      <div class='col-4 fw-bold'>Expected</div>
      <div class='col-4 fw-bold'>Output</div>
      <div class='col-1 fw-bold'>Result</div>
    </div>
    <hr />

    <div class='row' v-for='test, index in results' :key='index'>
      <div class='col-3'>
        <code>{{ test.label }}</code>
      </div>
      <div class='col-4'>
        <code>{{ test.expected }}</code>
      </div>
      <div class='col-4'>
        <code>{{ test.output }}</code>
      </div>
      <div class='col-1'>
        <span>
          <i v-if='test.passed' class="bi bi-check-lg text-success"></i>
          <i v-else class="bi bi-x-lg text-danger"></i>
        </span>
      </div>
      <hr class='mt-3' />
    </div>

    <div class='row'>
      <div class='col text-end fw-bold'>
        <span id='score'>{{ score }}</span> / {{ maxPoints }} Punkten
      </div>
    </div>
  </div>
</template>

<script>
// test-specific imports, constants, variables, and functions
import axios from 'axios';
const serverUrl = 'http://localhost:8000';
const expressUrl = 'http://localhost:8001';
const testBook = {
  "isbn13": 9780393316049,
  "isbn10": "0393316041",
  "title": "\"Surely You're Joking, Mr. Feynman!\"",
  "subtitle": "Adventures of a Curious Character",
  "authors": "Richard Phillips Feynman;Ralph Leighton",
  "categories": "Biography & Autobiography",
  "thumbnail": "http://books.google.com/books/content?id=ZRoF9aN8qjAC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  "description": "The Nobel Prize-winning theoretical physicist talks about his adventure-filled life in a series of transcribed taped discussions",
  "published_year": 1985,
  "average_rating": 4.28,
  "num_pages": 391,
  "ratings_count": 105685
};

export default {
  name: 'Tests',
  data() {
    return {
      alertStyle: 'alert-info',
      alertHeading: 'Tests running ...',
      score: 0,
      results: [],
      tests: [

        // server.js
        {
          points: 3,
          label: 'GET directory (3 Punkte)',
          cmd: async () => {
            let result = await axios.get(serverUrl + '/test/');
            let expected = '[{"path":"dir1","type":"directory"},{"path":"dir2","type":"directory"},{"path":"dir3","type":"directory"},{"path":"file1","type":"file"}]';
            return JSON.stringify(result.data) === expected;
          }, 
          expected: 'true'
        }, {
          points: 3,
          label: 'GET file (3 Punkte)',
          cmd: async () => {
            let result = await axios.get(serverUrl + '/test/file1');
            let expected = '/test/file1';
            return result.data === expected;
          }, 
          expected: 'true'
        }, {
          points: 2.5,
          label: 'POST create new file (2,5 Punkte)',
          cmd: async () => {
            await axios.post(serverUrl + '/test/file2', '/test/file2', {
              headers: { 'Content-Type': 'text/plain' }
            });
            let result = await axios.get(serverUrl + '/test/file2');
            let expected = '/test/file2';
            return result.data === expected;
          },
          expected: 'true'
        }, {
          points: 0.5,
          label: 'POST try overriding existing file (0,5 Punkte)',
          cmd: async () => {
            try {
              await axios.post(serverUrl + '/test/file2', '/test/file2', {
                headers: { 'Content-Type': 'text/plain' }
              });
            } catch (error) {
              return error.response.status === 400;
            }
          }, 
          expected: 'true'
        }, {
          points: 2.5,
          label: 'PUT update existing file (2,5 Punkte)',
          cmd: async () => {
            const update = '/test/file2 - updated';
            await axios.put(serverUrl + '/test/file2', update, {
              headers: { 'Content-Type': 'text/plain' }
            });
            let result = await axios.get(serverUrl + '/test/file2');
            return result.data === update;
          }, 
          expected: 'true'
        }, {
          points: 0.5,
          label: 'PUT try updating nonexistent file (0,5 Punkte)',
          cmd: async () => {
            try {
              await axios.put(serverUrl + '/test/file3', '/test/file3 - updated', {
                headers: { 'Content-Type': 'text/plain' }
              });
            } catch (error) {
              return error.response.status === 404;
            }
          }, 
          expected: 'true'
        }, {
          points: 2.5,
          label: 'DELETE existing file (2,5 Punkte)',
          cmd: async () => {
            await axios.delete(serverUrl + '/test/file2');
            try {
              await axios.get(serverUrl + '/test/file2');
            } catch (error) {
              return error.response.status === 404;
            }
          }, 
          expected: 'true'
        }, {
          points: 0.5,
          label: 'DELETE try to delete nonexistent file (0,5 Punkte)',
          cmd: async () => {
            try {
              await axios.delete(serverUrl + '/test/file2');
            } catch (error) {
              return error.response.status === 404;
            }
          }, 
          expected: 'true'
        },

        // express.js
        {
          points: 1,
          label: 'GET /books (1 Punkt)',
          cmd: async () => {
            let result = await axios.get(expressUrl + '/books?from=5&to=10');
            result = result.data.map((e) => e.isbn13);
            let expected = '[9780006551812,9780310243564,9780801435300,9780099173311,9780393316049]';
            return JSON.stringify(result) === expected;
          }, 
          expected: 'true'
        }, {
          points: 1,
          label: 'GET /book/9780393316049 (1 Punkt)',
          cmd: async () => {
            let result = await axios.get(expressUrl + '/book/9780393316049');
            return JSON.stringify(result.data) === JSON.stringify(testBook);
          }, 
          expected: 'true'
        }, {
          points: 1,
          label: 'POST /book/ (1 Punkt)',
          cmd: async () => {
            let newBook = Object.assign({}, testBook);
            newBook.isbn13 = 12345;
            await axios.post(expressUrl + '/book', newBook, {
              headers: { 'Content-Type': 'application/json' }
            });
            let result = await axios.get(expressUrl + '/book/12345');
            return JSON.stringify(result.data) === JSON.stringify(newBook);
          }, 
          expected: 'true'
        }, {
          points: 1,
          label: 'PUT /book/12345 (1 Punkt)',
          cmd: async () => {
            let newBook = Object.assign({}, testBook);
            newBook.isbn13 = 12345;
            newBook.title = 'Title updated';
            await axios.put(expressUrl + '/book/12345', newBook, {
              headers: { 'Content-Type': 'application/json' }
            });
            let result = await axios.get(expressUrl + '/book/12345');
            return JSON.stringify(result.data) === JSON.stringify(newBook);
          }, 
          expected: 'true'
        }, {
          points: 1,
          label: 'DELETE /book/12345 (1 Punkt)',
          cmd: async () => {
            await axios.delete(expressUrl + '/book/12345');
            try {
              await axios.get(expressUrl + '/book/12345');
            } catch (error) {
              return error.response.status === 404;
            }
          }, 
          expected: 'true'
        },

        // *** BONUS ***
        {
          points: 5,
          label: '*** BONUS *** GET and update random property of book (5 Punkte)',
          cmd: async () => {
            let newBook = Object.assign({}, testBook);
            let props = Object.keys(newBook).filter((key) => key !== 'isbn13');
            let randomProp = props[Math.floor(Math.random() * props.length)];
            let originalValue = newBook[randomProp];
            let updatedValue = (Math.random() + 1).toString(36).substring(7);

            await axios.put(expressUrl + '/book/' + newBook.isbn13 + '/' + randomProp, 
              { [randomProp]: updatedValue },
              { headers: { 'Content-Type': 'application/json' } }
            );
            let result = await axios.get(expressUrl + '/book/' + newBook.isbn13 + '/' + randomProp);
            let retrievedValue = result.data[randomProp];

            await axios.put(expressUrl + '/book/' + newBook.isbn13 + '/' + randomProp, 
              { [randomProp]: originalValue },
              { headers: { 'Content-Type': 'application/json' } }
            );
            return updatedValue === retrievedValue;
          }, 
          expected: 'true'
        },
      ]
    };
  },
  computed: {
    maxPoints() {
      return this.tests.reduce(calcPoints, 0);
    }
  },
  async mounted() {
    

    await this.$root.$nextTick();

    for (let i=0; i < this.tests.length; i++) {
      let result = null;
      try {
        result = JSON.stringify(await this.tests[i].cmd());
      } catch (err) {
        result = JSON.stringify(err);
      }

      let passed = result === this.tests[i].expected;
      this.results.push({
        points: this.tests[i].points,
        label: this.tests[i].label,
        expected: this.tests[i].expected,
        output: result,
        passed: passed
      });

      if (passed) {
        this.score += this.tests[i].points;
      }

      await timer(1000);
      if (i === this.tests.length-1) {
        this.cleanUp();
      }
    }
  },
  methods: {
    stopTests() {
      this.$emit('stop-tests', false);
    },
    cleanUp() {

      let errors = this.results.filter((e) => !e.passed);
      this.alertHeading = 
        (errors.length > 0) ?
          'Nicht alle Tests bestanden!'
          : 'Alle Tests bestanden!';

      this.alertStyle = 
        (errors.length > 0) ?
          'alert-danger'
          : 'alert-success';
      
      this.score = this.maxPoints - errors.reduce(calcPoints, 0);
    }
  }
}

let calcPoints = (acc, val) => acc + val.points;

function timer(ms) { 
  return new Promise(res => setTimeout(res, ms)); 
}
</script>