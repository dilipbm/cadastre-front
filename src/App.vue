<template>
  <div id="app">
    <b-container>
      <div class="mb-5">
        <b-navbar toggleable="lg" type="light">
          <b-navbar-brand href="/">Cadastre</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="nav-item-hover">
              <b-nav-item href="/bulkcollect">Collection en masse</b-nav-item>
              <b-nav-item href="/geolocalisation">Geolocalisation</b-nav-item>
              <!-- <b-nav-item href="#">Link</b-nav-item>
              <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <router-view />
      <footer class="footer">
        <span class="text-muted">Place sticky footer content here.</span>
      </footer>
    </b-container>
  </div>
</template>

<style lang="scss">
@import url("http://fonts.googleapis.com/css?family=Quicksand:400,300,700");

body {
  font-family: "Quicksand", sans-serif !important;
}

.nav-item-hover {
  text-align: center;
  font-weight: 500;
  letter-spacing: 1px;
}
.nav-item-hover * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
.nav-item-hover li {
  display: inline-block;
  list-style: outside none none;
  margin: 0.4em 0.8em;
  padding: 0;
}
.nav-item-hover a {
  padding: 0 0.7em;
  color: rgba(255, 255, 255, 0.5);
  position: relative;
  text-decoration: none;
  display: inline-block;
}
.nav-item-hover a:before {
  position: absolute;
  content: "";
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
  opacity: 0;
  left: 15%;
  right: 15%;
  top: 0;
  bottom: 0;
  border-left: 3px solid #17a2b8;
  border-right: 3px solid #17a2b8;
}
.nav-item-hover a:hover,
.nav-item-hover .current a {
  color: #ffffff;
}
.nav-item-hover a:hover:before,
.nav-item-hover .current a:before {
  opacity: 1;
  left: 0;
  right: 0;
}

.footer {
  bottom: 0;
  margin-top: 20px;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
}
</style>
