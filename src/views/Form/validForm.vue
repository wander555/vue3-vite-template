<template lang="">
  <div id="app">
    <van-form @failed="onFailed" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 1、单选框 -->
        <van-field name="radio" label="单选框" required="true">
          <template #input>
            <van-radio-group v-model="checked" direction="horizontal">
              <van-radio name="1">单选框 1</van-radio>
              <van-radio name="2">单选框 2</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <!-- 2、复选框组 -->
        <van-field name="checkboxGroup" label="复选框组">
          <template #input>
            <van-checkbox-group v-model="groupChecked" direction="horizontal">
              <van-checkbox name="1" shape="square">复选框 1</van-checkbox>
              <van-checkbox name="2" shape="square">复选框 2</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>

        <!--3、城市选择 -->
        <van-field
          v-model="result"
          is-link
          readonly
          name="area"
          label="地区选择"
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model:show="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirmAddress"
            @cancel="showArea = false"
          />
        </van-popup>

        <!-- 4、日期选择 -->
        <van-field
          v-model="calendarResult"
          is-link
          readonly
          name="calendar"
          label="日历"
          placeholder="点击选择日期"
          @click="showCalendar = true"
        />
        <van-calendar
          v-model:show="showCalendar"
          @confirm="onConfirmCalendar"
        />

        <!--/5、时间选择 -->
        <van-field
          v-model="timeResult"
          is-link
          readonly
          name="datetime"
          label="时间"
          placeholder="点击选择时间"
          @click="showDateTime = true"
        />
        <van-popup v-model:show="showDateTime" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择完整时间"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirmDateTime"
          />
        </van-popup>

        <!-- 6、允许输入数字，调起带符号的纯数字键盘 -->
        <van-field v-model="number" name="number" type="number" label="数字" />

        <!-- 7、下拉选择器 -->
        <van-field
          v-model="picker"
          readonly
          is-link
          arrow-direction="down"
          label="下拉"
          placeholder="点击选择"
          name="picker"
          @click="onShowPicker"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
            title="请选择"
            :columns="columns"
            :columns-field-names="customColumnsName"
            @cancel="showPicker = false"
            @confirm="onConfirmPicker"
          />
        </van-popup>
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { ref } from "vue";
import { areaList } from "@vant/area-data";
import formatdate from "../../utils/CommonUtils";
import request from "../../utils/request";
import { Toast } from "vant";

export default {
  setup() {
    const checked = ref("2");
    const groupChecked = ref(["1", "2"]);

    //城市选择
    const result = ref("");
    const showArea = ref(false);
    const onConfirmAddress = (areaValues) => {
      showArea.value = false;
      result.value = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("-");
    };

    //日期选择
    const calendarResult = ref("");
    const showCalendar = ref(false);
    const onConfirmCalendar = (date) => {
      console.log(formatdate(date));
      calendarResult.value = formatdate(date).split(" ")[0];
      showCalendar.value = false;
    };

    //时间选择
    const timeResult = ref("");
    const currentDate = ref(new Date());
    const showDateTime = ref(false);
    const onConfirmDateTime = (date) => {
      timeResult.value = formatdate(date);
      showDateTime.value = false;
    };

    //输入框
    const number = ref("0");

    //下拉选择

    const picker = ref("");
    const showPicker = ref(false);
    const onConfirmPicker = (value) => {
      picker.value = value.generalWasteName;
      showPicker.value = false;
    };
    const columns = ref([]);

    const onShowPicker = () => {
      request({
        url: "/generalTransferPlan/getGeneralTransferPlanDetailList.do",
        data: {
          firstName: "Fred",
          lastName: "Flintstone",
        },
        method: "post",
      }).then((res) => {
        columns.value = res;
        showPicker.value = true;
      });
    };

    const customColumnsName = {
      text: "generalWasteName",
      value: "id",
    };

    //表单验证失败提示
    const onFailed = (errorInfo) => {
      console.log("failed", errorInfo);
    };

    //表单提交
    const onSubmit = (values) => {
      console.log("submit", values);
    };

    return {
      checked,
      groupChecked,
      result,
      areaList,
      showArea,
      calendarResult,
      showCalendar,
      timeResult,
      showDateTime,
      currentDate,
      number,
      columns,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      picker,
      showPicker,
      customColumnsName,
      onShowPicker,
      onConfirmDateTime,
      onConfirmCalendar,
      onConfirmAddress,
      onConfirmPicker,
      onFailed,
      onSubmit,
    };
  },
  methods: {},
};
</script>
<style>
body {
  height: 100% !important;
  background-color: #f7f8fa !important;
}

#app {
  min-height: 100%;
}
</style>
