<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <Dashboard>
            <div class="page-section">
                <h2>Application</h2>
                <br>
                <form @submit.prevent="submitForm">
                    <div v-for="(processor, index) in processors" :key="index" class="processor">
                        <label>Application Name:</label>
                        <input v-model="processor.name" type="text" placeholder="Enter application name" />
                        <div v-for="(contact, contactIndex) in processor.contact" :key="contactIndex" class="contact">
                        <label>Contact Person:</label>
                        <input v-model="contact.name" type="text" placeholder="Enter name" />
                        
                        <label>Email:</label>
                        <input v-model="contact.email" type="email" placeholder="Enter email" />
                        
                        <label>Phone:</label>
                        <input v-model="contact.phone" type="tel" placeholder="Enter phone" />
                        
                        <label>Type:</label>
                        <select name="" id="" v-model="contact.type">
                            <option value="PRIMARY">PRIMARY</option>
                            <option value="SECONDARY">SECONDARY</option>
                            <option value="TECHNICAL">TECHNICAL</option>
                        </select>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <br>
            <hr>
            <br>
            <div>
                <p>Manage all your applications</p>
                <BaseTable :headers="tableHeaders" :rows="tableRows" />
                <br><br><br>
            </div>
        </Dashboard>
    </div>
</template>
<script lang="ts" setup>
    import Dashboard from '@/components/layouts/Dashboard.vue';
    import BaseTable from '@/components/BaseTable.vue';

    import { ref } from 'vue';

    const processors = ref([
        {
            "name": "Transaction Processor",
            "contact": [
            {
                "name": "Nathaniel Anum Adjah",
                "email": "nathanielanum13@gmail.com",
                "phone": "233509131631",
                "type": "PRIMARY"
            }
            ]
        }
    ]);

    const applications = [
    {
        "id": "ad26575e-bd62-4a52-9cbe-5b2dc7bc4e44",
        "name": "Extracter",
        "contact": [
          {
            "name": "Kwame Anum",
            "type": "PRIMARY",
            "email": "nathanielanum13@gmail.com",
            "phone": "233509131631"
          }
        ],
        "created_at": "2024-01-11T00:37:58.611Z",
        "updated_at": "2024-01-11T00:37:58.611Z"
      },
      {
        "id": "e00af237-b238-4405-a084-e8e9621c5ddb",
        "name": "Transaction Processor",
        "contact": [
          {
            "name": "Nathaniel Anum Adjah",
            "type": "PRIMARY",
            "email": "nathanielanum13@gmail.com",
            "phone": "233509131631"
          }
        ],
        "created_at": "2024-01-11T16:58:07.983Z",
        "updated_at": "2024-01-11T16:58:07.983Z"
      }
    ];

    const tableHeaders = ref(Object.keys(applications[0]));
    const tableRows = ref(applications.map(app => Object.values(app)));

    const submitForm = () => {
        console.log("Form submitted!");
    };
</script>
<style scoped>
.processor {
  margin-bottom: 20px;
}

.contact {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

button {
  background-color: #0058ef;
  color: white;
  padding: .75rem 1.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
  font-size: 1rem;
}

input,
select {
    padding: .75rem 1rem;
    margin-bottom: 1rem;
    width: min(600px, 100%);
    border: 1px solid #80808050;
    border-radius: .25rem;
    font-size: 1rem;
}
</style>