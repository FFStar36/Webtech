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
export default {
  name: 'Tests',
  data() {
    return {
      alertStyle: 'alert-info',
      alertHeading: 'Tests running ...',
      score: 0,
      results: [],
      tests: [
        // Aufgabe 1: JSON einlesen
        {
          points: 0.5,
          label: 'this.booksList: Alle Bücher eingelesen (0,5 Punkte)',
          cmd: async () => {
            return this.$root.booksList.length
          }, 
          expected: '6810' 
        }, { 
          points: 0.5,
          label: 'this.booksList: Autoren formatiert (0,5 Punkte)', 
          cmd: async () => {
            return this.$root.booksList[6].authors
          }, 
          expected: '"Leonard I. Sweet, Brian D. McLaren, Jerry Haselmayer"' 
        }, { 
          points: 0.5,
          label: 'this.booksList: Korrekte Sortierung I (0,5 Punkte)', 
          cmd: async () => {
            return this.$root.booksList.slice(0, 5).map((e) => e.isbn13)
          }, 
          expected: '[9780743470797,9781593083243,9789042003408,9781861891846,9780451150653]' 
        }, { 
          points: 0.5,
          label: 'this.booksList: Korrekte Sortierung II (0,5 Punkte)',
          cmd: async () => {
            return this.$root.booksList.slice(-5).map((e) => e.isbn13)
          }, 
          expected: '[9780943015538,9784770027726,9784770028013,9784770028037,9780520241824]' 
        }, 
        
        // Aufgabe 2: BooksList.vue
        { 
          points: 1,
          label: 'BooksList.vue: Titel anzeigen (1 Punkt)',
          cmd: async () => {
            return Array
              .from(document.querySelectorAll("#books .book .book-title"))
              .map((e) => e.innerHTML);
          }, 
          expected: '[", said the shotgun to the head.","... The Circulation","\'I\'m Telling You Stories\'","\'Photos of the Gods\'","\'Salem\'s Lot"]' 
        }, { 
          points: 1,
          label: 'BooksList.vue: Autoren anzeigen (1 Punkt)',
          cmd: async () => {
            return Array
              .from(document.querySelectorAll("#books .book .book-authors"))
              .map((e) => e.innerHTML);
          }, 
          expected: '["Saul Williams","Benjamin W. Ussery","Helena Grice, Tim Woods","Christopher Pinney","Stephen King"]' 
        }, { 
          points: 1,
          label: 'BooksList.vue: Eintrag auswählen (1 Punkt)',
          cmd: async () => {
            this.$root.page = 0;
            this.$root.$refs.booksListView.selectItem(4);
            await this.$root.$nextTick();
            return 'selectedIndex = ' + this.$root.selectedIndex;
          }, 
          expected: '"selectedIndex = 4"'
        },

        // Aufgabe 3: BooksListPagination.vue
        { 
          points: 1,
          label: 'BooksListPagination.vue: Zurück-Button disabled auf erster Seite (1 Punkt)', 
          cmd: async () => {
            this.$root.page = 0;
            await this.$root.$nextTick();
            return document.getElementById('pagination-back-button').className.includes('disabled');
          }, 
          expected: 'true' 
        }, { 
          points: 1,
          label: 'BooksListPagination.vue: Weiter-Button disabled auf letzter Seite (1 Punkt)', 
          cmd: async () => {
            this.$root.page = 1361;
            await this.$root.$nextTick();
            return document.getElementById('pagination-next-button').className.includes('disabled');
          }, 
          expected: 'true' 
        }, { 
          points: 1,
          label: 'BooksListPagination.vue: Seite 100 (1 Punkt)', 
          cmd: async () => {
            this.$root.page = 100;
            await this.$root.$nextTick();
            return Array
              .from(document.querySelectorAll('#books .book-title'))
              .map((e) => e.innerText);
          }, 
          expected: '["Atlas Shrugged","Atlas Shrugged","Atonement","Atonement","Atonement"]' 
        },

        // Aufgabe 4: BookView.vue
        { 
          points: 2,
          label: 'BookView.vue: Book Attribute src (2 Punkte)', 
          cmd: async () => {
            this.$root.selectedIndex = 5555;
            await this.$root.$nextTick();
            return document.getElementById('book-image').src;
          }, 
          expected: '"http://books.google.com/books/content?id=2zA7PgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"' 
        }, { 
          points: 2,
          label: 'BookView.vue: Book Titel (2 Punkte)', 
          cmd: async () => {
            this.$root.selectedIndex = 2;
            await this.$root.$nextTick();
            return document.getElementById('book-title').innerText;
          }, 
          expected: '"\'I\'m Telling You Stories\' - Jeanette Winterson and the Politics of Reading"'
        }, { 
          points: 2,
          label: 'BookView.vue: Book Properties (2 Punkte)', 
          cmd: async () => {
            this.$root.selectedIndex = 777;
            await this.$root.$nextTick();
            return Array
              .from(document.querySelectorAll("#book .book-property"))
              .map((e) => e.innerText.split(' ')[0]);
          }, 
          expected: '["Jen","4.06","Biography","A","0451221257","9780451221254","380","2007","28477"]' 
        },

        // Aufgabe 5: AuthorSearch.vue
        { 
          points: 1,
          label: 'AuthorSearch.vue: authorsList Länge (1 Punkt)', 
          cmd: async () => {
            return this.$root.authorsList.length
          }, 
          expected: '4471' 
        }, { 
          points: 1,
          label: 'AuthorSearch.vue: Autoren 2224-2234 (1 Punkt)', 
          cmd: async () => {
            return this.$root.authorsList.slice(2223, 2233)
          }, 
          expected: '["Joseph Tainter","Joseph Wambaugh","Josepha Sherman","Josiah Bunting","Joss Whedon","Jostein Gaarder","José Luis García-López","José Mauro de Vasconcelos","José Saramago","José Villarrubia"]' 
        }, { 
          points: 2,
          label: 'AuthorSearch.vue: Bücher von Bill Bryson (2 Punkte)', 
          cmd: async () => {
            this.$root.page = 0;
            this.$root.selectedIndex = 0;
            this.$root.$refs.authorSearch.testSearch('Bill Bryson');
            await this.$root.$nextTick();
            return Array
              .from(document.querySelectorAll('#books .book-title'))
              .map((e) => e.innerText);
          }, 
          expected: '["A Short History of Nearly Everything","A Short History of Nearly Everything","A Walk in the Woods","A Walk in the Woods","Bill Bryson\'s African Diary"]' 
        },

        // Aufgabe 6: NavBar.vue - Dark Mode
        { 
          points: 1,
          label: 'Dark Mode: Button Label "Lights on" (1 Punkt)', 
          cmd: async () => {
            this.$root.$refs.navBar.toggleDarkMode();
            await this.$root.$nextTick();
            return document.getElementById('btn-dark-mode').innerText.trim();
          }, 
          expected: '"Lights on"' 
        }, { 
          points: 1,
          label: 'Dark Mode: Stylesheet href-Attribute (1 Punkt)', 
          cmd: async () => {
            return document.getElementById('bootstrap-theme').href;
          }, 
          expected: '"https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-night.min.css"' 
        }
      ]
    };
  },
  computed: {
    maxPoints() {
      return this.tests.reduce(calcPoints, 0);
    }
  },
  async mounted() {
    this.$root.page = 0;
    this.$root.selectedIndex = 0;
    this.$root.filterFn = () => true;
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
      this.$root.page = 0;
      this.$root.selectedIndex = 0;
      this.$root.filterFn = () => true;
      this.$root.$refs.navBar.toggleDarkMode();

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