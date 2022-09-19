import { createApp } from "vue";
import {
  Button,
  Tabbar,
  TabbarItem,
  Form,
  Field,
  CellGroup,
  Picker,
  Checkbox,
  CheckboxGroup,
  DatetimePicker,
  RadioGroup,
  Radio,
  List,
  NavBar,
  Area,
} from "vant";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./utils/rem";

const pinia = createPinia();

import "vant/es/toast/style";

createApp(App)
  .use(Button)
  .use(router)
  .use(pinia)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(Picker)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(DatetimePicker)
  .use(RadioGroup)
  .use(Radio)
  .use(List)
  .use(NavBar)
  .use(Area)
  .mount("#app");
