import{_ as s,o as a,c as p,ag as l}from"./chunks/framework.DXGyWiRo.js";const e="/assets/image1.CwFr4Uce.webp",i="/assets/image2.C0c7Ez_h.webp",r="/assets/image3.DXg9Xkwc.webp",c="/assets/image4.CNMedO04.webp",g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tutorials/ESP-IDF-getting-started/11 I2C_多维度传感器/11.3 高精度气压传感器/index.md","filePath":"tutorials/ESP-IDF-getting-started/11 I2C_多维度传感器/11.3 高精度气压传感器/index.md","lastUpdated":null}'),b={name:"tutorials/ESP-IDF-getting-started/11 I2C_多维度传感器/11.3 高精度气压传感器/index.md"};function t(_,n,u,m,d,o){return a(),p("div",null,[...n[0]||(n[0]=[l('<h2 id="📜-版权声明" tabindex="-1">📜 版权声明 <a class="header-anchor" href="#📜-版权声明" aria-label="Permalink to &quot;📜 版权声明&quot;">​</a></h2><ul><li><strong>Copyright</strong>: 2026 MorkenMooooo</li><li><strong>Author</strong>: Mooooo (门主)</li><li><strong>平台</strong>: Bilibili &amp; Douyin &amp; WeChatOfficial @ <strong>门主引擎 | Mooooo</strong></li><li><strong>门主引擎官网</strong>：www.SovereignEngine.cn</li><li><strong>taobao</strong>：门主引擎（淘宝）</li><li><strong>联系</strong>: <a href="mailto:itsntcool@qq.com" target="_blank" rel="noreferrer">itsntcool@qq.com</a></li></ul><p>本项目采用 <strong>Apache License, Version 2.0</strong> 开源协议。除非符合许可要求，否则不得使用本文件。<br> 你可以在以下地址获取许可证副本：</p><p><a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noreferrer">http://www.apache.org/licenses/LICENSE-2.0</a></p><p>除非适用法律要求或书面同意，否则本软件按“原样”分发，无任何明示或暗示的保证。<br> 有关详细信息，请参阅许可证以了解特定语言管理的权限和限制。</p><h2 id="_1-bmp280大气气压传感器模块实物图及原理图" tabindex="-1">1. BMP280大气气压传感器模块实物图及原理图 <a class="header-anchor" href="#_1-bmp280大气气压传感器模块实物图及原理图" aria-label="Permalink to &quot;1. BMP280大气气压传感器模块实物图及原理图&quot;">​</a></h2><p><img src="'+e+'" alt=""></p><p><img src="'+i+'" alt=""></p><p><img src="'+r+'" alt=""></p><p><img src="'+c+`" alt=""></p><h2 id="_2-bmp280的i2c协议有什么特点" tabindex="-1">2. BMP280的I2C协议有什么特点？ <a class="header-anchor" href="#_2-bmp280的i2c协议有什么特点" aria-label="Permalink to &quot;2. BMP280的I2C协议有什么特点？&quot;">​</a></h2><p>具体看BMP280数据手册，现在这款BMP280大气气压传感器模块已经被厂家固定为4个引脚了，分别为VIN、GND、SCL、SDA。</p><p style="margin-top:0.5em;font-size:0.9em;color:#666;"> 如果无法预览，请点击 <a href="/BST-BMP280-DS001-11.pdf">此处下载 BMP280数据手册 PDF 文件</a>。 </p><iframe src="/BST-BMP280-DS001-11.pdf" width="100%" height="800px" style="border:1px solid #e5e7eb;border-radius:8px;"></iframe><p>而且BMP280数据手册里写明：</p><p>The 7-bit device address is 111011x. The 6 MSB bits are fixed. The last bit is changeable by SDO value and can be changed during operation. Connecting SDO to GND results in slave address 1110110 (0x76); connection it to VDDIO results in slave address 1110111 (0x77), which is the same as BMP180’s I²C address. The SDO pin cannot be left floating; if left floating, the I²C address will be undefined.</p><p>The I²C interface uses the following pins:</p><ul><li>SCK: serial clock (SCL)</li><li>SDI: data (SDA)</li><li>SDO: Slave address LSB (GND = ‘0’, VDDIO = ‘1’)</li></ul><p>CSB must be connected to VDDIO to select I²C interface. SDI is bi-directional with open drain to GND: it must be externally connected to VDDIO via a pull up resistor. Refer to chapter 6 for connection instructions.</p><h2 id="_3-bmp280的ai提示词有哪些要明确的" tabindex="-1">3. BMP280的AI提示词有哪些要明确的？ <a class="header-anchor" href="#_3-bmp280的ai提示词有哪些要明确的" aria-label="Permalink to &quot;3. BMP280的AI提示词有哪些要明确的？&quot;">​</a></h2><p>现在我手头上有一块 BMP280 大气压传感器模块，它有 4 个引脚，分别是 VIN、GND、SCL 和 SDA。<br> 我已经将这个 BMP280 传感器模块的引脚连接到了 ESP32-S3 开发板上，具体接线如下：</p><ol><li>SCL 引脚连接到 ESP32-S3 的 7 号引脚</li><li>SDA 引脚连接到了 15 号引脚<br> 我电脑目前使用的是 VS Code 加 ESP-IDF 插件进行编程，已经通过安装管理器安装好了 ESP-IDF V6.0 版本。<br> 现在请你告诉我应该怎么写代码。要求如下：</li><li>不要使用现成的 BMP280 库或组件</li><li>我需要从头开始写，用 I2C 驱动来写</li><li>我查资料说，如果 BMP280 只有 4 个引脚，它的 I2C 地址就是 0x76，你看一下是否正确<br> 请直接给出代码。</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdint.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &quot;freertos/FreeRTOS.h&quot;</span></span>
<span class="line"><span>#include &quot;freertos/task.h&quot;</span></span>
<span class="line"><span>#include &quot;driver/i2c_master.h&quot;</span></span>
<span class="line"><span>#include &quot;esp_log.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 宏定义：根据你的实际接线修改 GPIO 编号</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>#define I2C_MASTER_SCL_IO    15</span><span>        // SCL 引脚</span></span>
<span class="line"><span>#define I2C_MASTER_SDA_IO    7</span><span>        // SDA 引脚</span></span>
<span class="line"><span>#define I2C_MASTER_FREQ_HZ   400000</span><span>   // I2C 总线速度：400kHz（Fast Mode）</span></span>
<span class="line"><span>#define BMP280_ADDR          0x76</span><span>     // BMP280 I2C 地址（SDO 接 GND）</span></span>
<span class="line"><span>#define I2C_TIMEOUT_MS       1000</span><span>     // I2C 操作超时时间（毫秒）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * BMP280 寄存器地址定义</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>#define BMP280_REG_CHIP_ID   0xD0</span><span>     // 芯片 ID 寄存器，读取应为 0x58</span></span>
<span class="line"><span>#define BMP280_REG_RESET     0xE0</span><span>     // 软复位寄存器，写入 0xB6 触发复位</span></span>
<span class="line"><span>#define BMP280_REG_STATUS    0xF3</span><span>     // 状态寄存器</span></span>
<span class="line"><span>#define BMP280_REG_CTRL_MEAS 0xF4</span><span>     // 控制寄存器：配置过采样和工作模式</span></span>
<span class="line"><span>#define BMP280_REG_CONFIG    0xF5</span><span>     // 配置寄存器：配置滤波器和待机时间</span></span>
<span class="line"><span>#define BMP280_REG_DATA      0xF7</span><span>     // 测量数据起始寄存器（共 6 字节）</span></span>
<span class="line"><span>#define BMP280_REG_CALIB     0x88</span><span>     // 校准参数起始寄存器（共 24 字节）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 数据类型定义（来自 BMP280 数据手册）</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>typedef int32_t  BMP280_S32_t;</span></span>
<span class="line"><span>typedef uint32_t BMP280_U32_t;</span></span>
<span class="line"><span>typedef int64_t  BMP280_S64_t;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static const char *TAG = &quot;BMP280&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 全局变量：I2C 句柄</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static i2c_master_bus_handle_t bus_handle;</span></span>
<span class="line"><span>static i2c_master_dev_handle_t dev_handle;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 全局变量：校准参数结构体</span></span>
<span class="line"><span> * 这些参数在出厂时写入传感器内部，用于将原始 ADC 值转换为实际物理量</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static struct {</span></span>
<span class="line"><span>    uint16_t dig_T1;</span></span>
<span class="line"><span>    int16_t  dig_T2, dig_T3;</span></span>
<span class="line"><span>    uint16_t dig_P1;</span></span>
<span class="line"><span>    int16_t  dig_P2, dig_P3, dig_P4, dig_P5;</span></span>
<span class="line"><span>    int16_t  dig_P6, dig_P7, dig_P8, dig_P9;</span></span>
<span class="line"><span>} calib;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 全局变量：t_fine（温度补偿中间值，气压补偿也需要用到）</span></span>
<span class="line"><span> * 必须先计算温度，t_fine 才有效，再计算气压</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static BMP280_S32_t t_fine;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 函数：写寄存器</span></span>
<span class="line"><span> * 对应数据手册 5.2.1 I²C Write：</span></span>
<span class="line"><span> *   START → 从机地址(写) → 寄存器地址 → 数据 → STOP</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static esp_err_t bmp280_write_reg(uint8_t reg_addr, uint8_t value)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    uint8_t buf[2] = {reg_addr, value};</span></span>
<span class="line"><span>    return i2c_master_transmit(dev_handle, buf, 2, I2C_TIMEOUT_MS);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 函数：读寄存器（支持连续读取多个字节）</span></span>
<span class="line"><span> * 对应数据手册 5.2.2 I²C Read：</span></span>
<span class="line"><span> *   START → 从机地址(写) → 寄存器地址 → Repeated Start</span></span>
<span class="line"><span> *   → 从机地址(读) → 数据(自动递增) → NACK → STOP</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static esp_err_t bmp280_read_reg(uint8_t reg_addr, uint8_t *data, size_t len)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    return i2c_master_transmit_receive(dev_handle, &amp;reg_addr, 1, data, len, I2C_TIMEOUT_MS);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 函数：读取并解析 24 字节校准参数（寄存器 0x88~0x9F）</span></span>
<span class="line"><span> * 校准参数以小端格式存储（低字节在前，高字节在后）</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static esp_err_t bmp280_read_calib(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    uint8_t trim[24];</span></span>
<span class="line"><span>    esp_err_t ret = bmp280_read_reg(BMP280_REG_CALIB, trim, 24);</span></span>
<span class="line"><span>    if (ret != ESP_OK) return ret;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 将字节数组解析为有符号/无符号 16 位整数</span></span>
<span class="line"><span>    calib.dig_T1 = (uint16_t)(trim[1] &lt;&lt; 8 | trim[0]);</span></span>
<span class="line"><span>    calib.dig_T2 = (int16_t) (trim[3] &lt;&lt; 8 | trim[2]);</span></span>
<span class="line"><span>    calib.dig_T3 = (int16_t) (trim[5] &lt;&lt; 8 | trim[4]);</span></span>
<span class="line"><span>    calib.dig_P1 = (uint16_t)(trim[7] &lt;&lt; 8 | trim[6]);</span></span>
<span class="line"><span>    calib.dig_P2 = (int16_t) (trim[9] &lt;&lt; 8 | trim[8]);</span></span>
<span class="line"><span>    calib.dig_P3 = (int16_t) (trim[11] &lt;&lt; 8 | trim[10]);</span></span>
<span class="line"><span>    calib.dig_P4 = (int16_t) (trim[13] &lt;&lt; 8 | trim[12]);</span></span>
<span class="line"><span>    calib.dig_P5 = (int16_t) (trim[15] &lt;&lt; 8 | trim[14]);</span></span>
<span class="line"><span>    calib.dig_P6 = (int16_t) (trim[17] &lt;&lt; 8 | trim[16]);</span></span>
<span class="line"><span>    calib.dig_P7 = (int16_t) (trim[19] &lt;&lt; 8 | trim[18]);</span></span>
<span class="line"><span>    calib.dig_P8 = (int16_t) (trim[21] &lt;&lt; 8 | trim[20]);</span></span>
<span class="line"><span>    calib.dig_P9 = (int16_t) (trim[23] &lt;&lt; 8 | trim[22]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ESP_LOGI(TAG, &quot;校准参数读取成功&quot;);</span></span>
<span class="line"><span>    return ESP_OK;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 函数：温度补偿算法（来自 BMP280 数据手册）</span></span>
<span class="line"><span> * 输入：20 位原始 ADC 温度值</span></span>
<span class="line"><span> * 输出：温度，单位 0.01°C（例如返回 2345 表示 23.45°C）</span></span>
<span class="line"><span> * 副作用：更新全局变量 t_fine（气压补偿需要用到）</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static BMP280_S32_t bmp280_compensate_T(BMP280_S32_t adc_T)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    BMP280_S32_t var1, var2, T;</span></span>
<span class="line"><span>    var1 = ((((adc_T &gt;&gt; 3) - ((BMP280_S32_t)calib.dig_T1 &lt;&lt; 1))) *</span></span>
<span class="line"><span>            ((BMP280_S32_t)calib.dig_T2)) &gt;&gt; 11;</span></span>
<span class="line"><span>    var2 = (((((adc_T &gt;&gt; 4) - ((BMP280_S32_t)calib.dig_T1)) *</span></span>
<span class="line"><span>              ((adc_T &gt;&gt; 4) - ((BMP280_S32_t)calib.dig_T1))) &gt;&gt; 12) *</span></span>
<span class="line"><span>            ((BMP280_S32_t)calib.dig_T3)) &gt;&gt; 14;</span></span>
<span class="line"><span>    t_fine = var1 + var2;           // 更新 t_fine，气压计算需要用到</span></span>
<span class="line"><span>    T = (t_fine * 5 + 128) &gt;&gt; 8;   // 转换为 0.01°C 单位</span></span>
<span class="line"><span>    return T;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 函数：气压补偿算法（来自 BMP280 数据手册）</span></span>
<span class="line"><span> * 输入：20 位原始 ADC 气压值</span></span>
<span class="line"><span> * 输出：气压，Q24.8 格式（除以 256 得到 Pa）</span></span>
<span class="line"><span> * 注意：必须在调用 bmp280_compensate_T() 之后调用，否则 t_fine 无效</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static BMP280_U32_t bmp280_compensate_P(BMP280_S32_t adc_P)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    BMP280_S64_t var1, var2, p;</span></span>
<span class="line"><span>    var1 = ((BMP280_S64_t)t_fine) - 128000;</span></span>
<span class="line"><span>    var2 = var1 * var1 * (BMP280_S64_t)calib.dig_P6;</span></span>
<span class="line"><span>    var2 = var2 + ((var1 * (BMP280_S64_t)calib.dig_P5) &lt;&lt; 17);</span></span>
<span class="line"><span>    var2 = var2 + (((BMP280_S64_t)calib.dig_P4) &lt;&lt; 35);</span></span>
<span class="line"><span>    var1 = ((var1 * var1 * (BMP280_S64_t)calib.dig_P3) &gt;&gt; 8) +</span></span>
<span class="line"><span>           ((var1 * (BMP280_S64_t)calib.dig_P2) &lt;&lt; 12);</span></span>
<span class="line"><span>    var1 = (((((BMP280_S64_t)1) &lt;&lt; 47) + var1)) *</span></span>
<span class="line"><span>           ((BMP280_S64_t)calib.dig_P1) &gt;&gt; 33;</span></span>
<span class="line"><span>    if (var1 == 0) return 0;        // 避免除以零</span></span>
<span class="line"><span>    p = 1048576 - adc_P;</span></span>
<span class="line"><span>    p = (((p &lt;&lt; 31) - var2) * 3125) / var1;</span></span>
<span class="line"><span>    var1 = (((BMP280_S64_t)calib.dig_P9) * (p &gt;&gt; 13) * (p &gt;&gt; 13)) &gt;&gt; 25;</span></span>
<span class="line"><span>    var2 = (((BMP280_S64_t)calib.dig_P8) * p) &gt;&gt; 19;</span></span>
<span class="line"><span>    p = ((p + var1 + var2) &gt;&gt; 8) + (((BMP280_S64_t)calib.dig_P7) &lt;&lt; 4);</span></span>
<span class="line"><span>    return (BMP280_U32_t)p;  // Q24.8 格式，除以 256 得到 Pa</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 函数：初始化 BMP280</span></span>
<span class="line"><span> * 步骤：验证芯片 ID → 软复位 → 读取校准参数 → 配置工作模式</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static esp_err_t bmp280_init(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    esp_err_t ret;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 1. 验证芯片 ID（寄存器 0xD0，期望值 0x58）</span></span>
<span class="line"><span>    uint8_t chip_id;</span></span>
<span class="line"><span>    ret = bmp280_read_reg(BMP280_REG_CHIP_ID, &amp;chip_id, 1);</span></span>
<span class="line"><span>    if (ret != ESP_OK) {</span></span>
<span class="line"><span>        ESP_LOGE(TAG, &quot;读取芯片 ID 失败，请检查接线和 I2C 地址&quot;);</span></span>
<span class="line"><span>        return ret;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (chip_id != 0x58) {</span></span>
<span class="line"><span>        ESP_LOGE(TAG, &quot;芯片 ID 错误：期望 0x58，实际 0x%02X&quot;, chip_id);</span></span>
<span class="line"><span>        return ESP_ERR_NOT_FOUND;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    ESP_LOGI(TAG, &quot;芯片 ID 验证成功：0x%02X&quot;, chip_id);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 2. 软复位（写 0xB6 到寄存器 0xE0），让传感器恢复默认状态</span></span>
<span class="line"><span>    ret = bmp280_write_reg(BMP280_REG_RESET, 0xB6);</span></span>
<span class="line"><span>    if (ret != ESP_OK) return ret;</span></span>
<span class="line"><span>    vTaskDelay(pdMS_TO_TICKS(10));  // 等待复位完成</span></span>
<span class="line"><span>    ESP_LOGI(TAG, &quot;软复位完成&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 3. 读取出厂校准参数（寄存器 0x88~0x9F，共 24 字节）</span></span>
<span class="line"><span>    ret = bmp280_read_calib();</span></span>
<span class="line"><span>    if (ret != ESP_OK) return ret;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 4. 配置工作模式（寄存器 0xF4）</span></span>
<span class="line"><span>    //    bit[7:5] osrs_t = 010 → 温度过采样 x2</span></span>
<span class="line"><span>    //    bit[4:2] osrs_p = 101 → 气压过采样 x16</span></span>
<span class="line"><span>    //    bit[1:0] mode   = 11  → Normal 模式（持续测量）</span></span>
<span class="line"><span>    //    0b01010111 = 0x57</span></span>
<span class="line"><span>    ret = bmp280_write_reg(BMP280_REG_CTRL_MEAS, 0x57);</span></span>
<span class="line"><span>    if (ret != ESP_OK) return ret;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 5. 配置滤波器（寄存器 0xF5）</span></span>
<span class="line"><span>    //    bit[4:2] filter = 100 → IIR 滤波系数 16</span></span>
<span class="line"><span>    //    bit[7:5] t_sb   = 100 → 待机时间 500ms</span></span>
<span class="line"><span>    //    0b10010000 = 0x90</span></span>
<span class="line"><span>    ret = bmp280_write_reg(BMP280_REG_CONFIG, 0x90);</span></span>
<span class="line"><span>    if (ret != ESP_OK) return ret;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ESP_LOGI(TAG, &quot;BMP280 初始化完成&quot;);</span></span>
<span class="line"><span>    return ESP_OK;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 函数：读取一次气压和温度数据</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>static esp_err_t bmp280_read_data(float *temperature_c, float *pressure_pa)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // 读取 6 字节原始数据（寄存器 0xF7~0xFC，一次性连续读取）</span></span>
<span class="line"><span>    // raw[0..2]：气压 MSB/LSB/XLSB</span></span>
<span class="line"><span>    // raw[3..5]：温度 MSB/LSB/XLSB</span></span>
<span class="line"><span>    uint8_t raw[6];</span></span>
<span class="line"><span>    esp_err_t ret = bmp280_read_reg(BMP280_REG_DATA, raw, 6);</span></span>
<span class="line"><span>    if (ret != ESP_OK) return ret;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 将 3 字节拼接为 20 位原始值（高 20 位有效，低 4 位为 XLSB）</span></span>
<span class="line"><span>    int32_t adc_P = ((int32_t)raw[0] &lt;&lt; 12) | ((int32_t)raw[1] &lt;&lt; 4) | (raw[2] &gt;&gt; 4);</span></span>
<span class="line"><span>    int32_t adc_T = ((int32_t)raw[3] &lt;&lt; 12) | ((int32_t)raw[4] &lt;&lt; 4) | (raw[5] &gt;&gt; 4);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 注意：必须先计算温度，t_fine 才有效，再计算气压</span></span>
<span class="line"><span>    BMP280_S32_t temp_raw = bmp280_compensate_T(adc_T);</span></span>
<span class="line"><span>    BMP280_U32_t press_raw = bmp280_compensate_P(adc_P);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 温度：单位 0.01°C → 转换为 °C</span></span>
<span class="line"><span>    *temperature_c = (float)temp_raw / 100.0f;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 气压：Q24.8 格式 → 除以 256 得到 Pa</span></span>
<span class="line"><span>    *pressure_pa = (float)press_raw / 256.0f;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return ESP_OK;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* ============================================================</span></span>
<span class="line"><span> * 主任务</span></span>
<span class="line"><span> * ============================================================ */</span></span>
<span class="line"><span>void app_main(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ESP_LOGI(TAG, &quot;程序启动&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // ---- 初始化 I2C 主机总线 ----</span></span>
<span class="line"><span>    i2c_master_bus_config_t bus_config = {</span></span>
<span class="line"><span>        .i2c_port = I2C_NUM_0,</span></span>
<span class="line"><span>        .sda_io_num = I2C_MASTER_SDA_IO,</span></span>
<span class="line"><span>        .scl_io_num = I2C_MASTER_SCL_IO,</span></span>
<span class="line"><span>        .clk_source = I2C_CLK_SRC_DEFAULT,</span></span>
<span class="line"><span>        .glitch_ignore_cnt = 7,</span></span>
<span class="line"><span>        .flags.enable_internal_pullup = true,  // 启用内部上拉电阻</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    ESP_ERROR_CHECK(i2c_new_master_bus(&amp;bus_config, &amp;bus_handle));</span></span>
<span class="line"><span>    ESP_LOGI(TAG, &quot;I2C 总线初始化完成&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // ---- 添加 BMP280 设备到总线 ----</span></span>
<span class="line"><span>    i2c_device_config_t dev_config = {</span></span>
<span class="line"><span>        .dev_addr_length = I2C_ADDR_BIT_LEN_7,  // 7 位地址</span></span>
<span class="line"><span>        .device_address = BMP280_ADDR,           // 0x76</span></span>
<span class="line"><span>        .scl_speed_hz = I2C_MASTER_FREQ_HZ,     // 400kHz</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    ESP_ERROR_CHECK(i2c_master_bus_add_device(bus_handle, &amp;dev_config, &amp;dev_handle));</span></span>
<span class="line"><span>    ESP_LOGI(TAG, &quot;BMP280 设备添加完成&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // ---- 初始化 BMP280 ----</span></span>
<span class="line"><span>    ESP_ERROR_CHECK(bmp280_init());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // ---- 循环读取数据 ----</span></span>
<span class="line"><span>    float temperature, pressure;</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        esp_err_t ret = bmp280_read_data(&amp;temperature, &amp;pressure);</span></span>
<span class="line"><span>        if (ret == ESP_OK) {</span></span>
<span class="line"><span>            ESP_LOGI(TAG, &quot;温度: %.2f °C | 气压: %.2f Pa (%.2f hPa)&quot;,</span></span>
<span class="line"><span>                     temperature, pressure, pressure / 100.0f);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            ESP_LOGE(TAG, &quot;读取数据失败: %s&quot;, esp_err_to_name(ret));</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        vTaskDelay(pdMS_TO_TICKS(1000));  // 每秒读取一次</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br></div></div>`,23)])])}const S=s(b,[["render",t]]);export{g as __pageData,S as default};
