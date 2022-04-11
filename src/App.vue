<template>
  <div id="app">
    <b-container>
      <div class="mb-5">
        <b-navbar toggleable="lg" type="light" variant="info">
          <b-navbar-brand href="#" class="text-white">Accueil</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <!-- <b-nav-item href="#">Link</b-nav-item>
              <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <router-view />
      <footer class="footer">
        <span class="text-white">Place sticky footer content here.</span>
      </footer>
    </b-container>
  </div>
</template>

<style lang="scss">
.footer {
  bottom: 0;
  margin-top: 20px;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
  background-color: #17a2b8 !important;
}
</style>
