<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard-layout">
    <aside>
      <nav class="sidebar">
        <div class="flex my-2">
          <div class="user-avatar size-2">N</div>
        </div>
        <hr>
        <br>
        <ul>
          <li><RouterLink to="/">Dashboard</RouterLink></li>
          <li><RouterLink to="/application">Application</RouterLink></li>
          <li><RouterLink to="/sequence">Sequence</RouterLink></li>
        </ul>
      </nav>
    </aside>
    <main>
      <nav class="navbar">
        <div class="logo">TXR</div>
        <!-- <div class="navbar-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
        </div> -->
        <div class="account-profile">
          <div class="user-info">
            <div class="user-name">Nathaniel Anum Adjah</div>
          </div>
          <div class="user-avatar">N</div>
        </div>
      </nav>
      <div class="content">
        <slot>Content goes here</slot>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
  import { RouterLink } from 'vue-router'

</script>
<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-areas: "aside main";
  grid-template-columns: 300px 1fr;
  min-height: 100vh;
}

aside {
  grid-area: aside;
  background-color: #3b3a3a;
  color: white;
  /* margin: .5rem; */
  /* border-radius: 1rem; */
}

.sidebar {
  padding: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: .5rem;
}

.sidebar a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  width: 100%;
  padding: .75rem 1rem;
  display: block;
}

.sidebar a.router-link-active {
  background-color: #ffffff30;
  color: #90c8f0;
  font-weight: bolder;
  border-radius: .5rem;
}

.sidebar a:hover {
  color: #90c8f0;
  font-weight: bolder;
  background-color: #ffffff30;
  border-radius: .5rem;
}

.main {
  grid-area: main;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #68727b;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom-left-radius: 1rem; */
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  margin-left: 1rem;
  transition: color 0.3s;
}

.navbar-links a:hover {
  color: #f9f9f9;
}

.account-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  font-weight: bold;
  color: #3498db; /* Avatar color */
}

.user-avatar.size-2 {
  width: 80px;
  height: 80px;
  font-size: 2rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
}

.content {
  padding: 1rem;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-2 {
  margin-block: 2rem;
}
</style>
