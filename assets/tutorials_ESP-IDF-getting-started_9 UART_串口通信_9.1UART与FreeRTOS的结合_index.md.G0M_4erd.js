import{_ as e,o as l,c as r,ag as a,j as s,a as p}from"./chunks/framework.DXGyWiRo.js";const i="/assets/image-0.bdtZUhia.webp",t="/assets/image-1.Qtfx9dJ8.webp",c="/assets/image-2.CHl-gdCY.webp",b="/assets/image-3.DzpHdjr3.webp",u="/assets/image-4.DTgnegWo.webp",_="/assets/image-5.BrEvo6xY.webp",m="/assets/image-6.CjnEMlj9.webp",o="/assets/image-7.B8In7kcV.webp",d="/assets/image-8.DRAxmTls.webp",T="/assets/image-9.DHadZTZh.webp",h="/assets/image-10.CkAtIczI.webp",f="/assets/image-11.CnQi7uKU.webp",g="/assets/image-12.Cf0bCVeC.webp",R="/assets/image-13.DagusmFZ.webp",U="/assets/image-14.DEcXnhfX.webp",A="/assets/image-15.BN2Lmkl9.webp",L=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tutorials/ESP-IDF-getting-started/9 UART_串口通信/9.1UART与FreeRTOS的结合/index.md","filePath":"tutorials/ESP-IDF-getting-started/9 UART_串口通信/9.1UART与FreeRTOS的结合/index.md","lastUpdated":null}'),P={name:"tutorials/ESP-IDF-getting-started/9 UART_串口通信/9.1UART与FreeRTOS的结合/index.md"};function S(I,n,v,O,q,E){return l(),r("div",null,[...n[0]||(n[0]=[a('<h2 id="📜-版权声明-apache-2-0" tabindex="-1">📜 版权声明 (Apache 2.0) <a class="header-anchor" href="#📜-版权声明-apache-2-0" aria-label="Permalink to &quot;📜 版权声明 (Apache 2.0)&quot;">​</a></h2><ul><li><strong>Copyright</strong>: 2026 MorkenMooooo</li><li><strong>Author</strong>: Mooooo (门主)</li><li><strong>平台</strong>: Bilibili &amp; Douyin &amp; 微信公众号 @ <strong>门主引擎 | Mooooo</strong></li><li><strong>联系</strong>: <a href="mailto:itsntcool@qq.com" target="_blank" rel="noreferrer">itsntcool@qq.com</a></li></ul><p>本项目采用 <strong>Apache License</strong>**, Version 2.0** 开源协议。 除非符合许可要求，否则不得使用本文件。 你可以在以下地址获取许可证副本： <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noreferrer">http://www.apache.org/licenses/LICENSE-2.0</a></p><p>除非适用法律要求或书面同意，否则本软件按“原样”分发，无任何明示或暗示的保证。</p><p>有关详细信息，请参阅许可证以了解特定语言管理的权限和限制。</p><h2 id="四、esp32-uart如何控制led灯" tabindex="-1">四、ESP32 UART如何控制LED灯？ <a class="header-anchor" href="#四、esp32-uart如何控制led灯" aria-label="Permalink to &quot;四、ESP32 UART如何控制LED灯？&quot;">​</a></h2><h3 id="_1、流程" tabindex="-1">1、流程 <a class="header-anchor" href="#_1、流程" aria-label="Permalink to &quot;1、流程&quot;">​</a></h3>',7),s("ol",null,[s("li",null,[p("配置GPIO结构体，并使能GPIO（LED灯的引脚） "),s("ol",null,[s("li",null,"gpio_config_t"),s("li",null,"gpio_config(&gpio_config_t)")])]),s("li",null,"安装驱动程序 - 为 UART 驱动程序分配 ESP32-S3 资源"),s("li",null,"设置通信参数 - 设置波特率、数据位、停止位等"),s("li",null,"设置通信管脚 - 分配连接设备的管脚"),s("li",null,"运行 UART 通信 - 发送/接收数据"),s("li",null,[p("检测 if MSB 第1位数据是0还是1，并输出LED灯引脚高低电平，进而控制LED灯亮灭 "),s("ol",null,[s("li",{"css-module":"...."},"if (data[0] == '1')"),s("li",{"css-module":"...."},"if (data[0] == '0')")])])],-1),a('<h2 id="五、什么是uart中断-freertos多任务-中断" tabindex="-1">五、什么是UART中断（FreeRTOS多任务+中断）？ <a class="header-anchor" href="#五、什么是uart中断-freertos多任务-中断" aria-label="Permalink to &quot;五、什么是UART中断（FreeRTOS多任务+中断）？&quot;">​</a></h2><h3 id="_5-1-先了解freertos是什么" tabindex="-1">5.1 先了解FreeRTOS是什么 <a class="header-anchor" href="#_5-1-先了解freertos是什么" aria-label="Permalink to &quot;5.1 先了解FreeRTOS是什么&quot;">​</a></h3><p>乐鑫官方网页ESP-IDF FreeRTOS介绍：<a href="https://documentation.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/freertos.html#freertos" target="_blank" rel="noreferrer">https://documentation.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/freertos.html#freertos</a></p><p>❗ Important</p><p>因为ESP-IDF是基于C语言和FreeRTOS进行开发的，所以ESP-IDF与STM32HAL库区别很大，ESP-IDF的void app_main(void)就是FreeRTOS的主任务程序。</p><p><img src="'+i+'" alt="人眼眨眼频率相比于CPU频率"></p><p><img src="'+t+'" alt="高铁并行"></p><p><img src="'+c+'" alt="串行与并行以及并发概念图"></p><h3 id="_5-2-为什么说esp-idf-freertos任务的有4种状态" tabindex="-1">5.2 为什么说ESP-IDF FreeRTOS任务的有4种状态？ <a class="header-anchor" href="#_5-2-为什么说esp-idf-freertos任务的有4种状态" aria-label="Permalink to &quot;5.2 为什么说ESP-IDF FreeRTOS任务的有4种状态？&quot;">​</a></h3><p>IDF FreeRTOS 中任务的结构与 Vanilla FreeRTOS 相同。具体而言，IDF FreeRTOS 任务：</p><ul><li>只能处于以下任一状态：运行中、就绪、阻塞或挂起。</li><li>任务函数通常为无限循环。</li><li>任务函数不应返回。</li></ul><h3 id="_5-3-esp-idf-freertos有哪些api参考" tabindex="-1">5.3 ESP-IDF FreeRTOS有哪些API参考？ <a class="header-anchor" href="#_5-3-esp-idf-freertos有哪些api参考" aria-label="Permalink to &quot;5.3 ESP-IDF FreeRTOS有哪些API参考？&quot;">​</a></h3><p><a href="https://documentation.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/freertos_idf.html#id22" target="_blank" rel="noreferrer">https://documentation.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/freertos_idf.html#id22</a></p><p><img src="'+b+`" alt="UART FreeRTOS 引入"></p><p>static inline BaseType_txTaskCreate(TaskFunction_t pxTaskCode, const char *const pcName, const configSTACK_DEPTH_TYPE usStackDepth, void *const pvParameters, UBaseType_t uxPriority, TaskHandle_t *const pxCreatedTask)</p><pre><code>示例代码：
</code></pre><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Task to be created.</span></span>
<span class="line"><span>void vTaskCode( void * pvParameters )</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>for( ;; )</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>// Task code goes here.</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Function that creates a task.</span></span>
<span class="line"><span>void vOtherFunction( void )</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>static uint8_t ucParameterToPass;</span></span>
<span class="line"><span>TaskHandle_t xHandle = NULL;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Create the task, storing the handle.  Note that the passed parameter ucParameterToPass</span></span>
<span class="line"><span>// must exist for the lifetime of the task, so in this case is declared static.  If it was just an</span></span>
<span class="line"><span>// an automatic stack variable it might no longer exist, or at least have been corrupted, by the time</span></span>
<span class="line"><span>// the new task attempts to access it.</span></span>
<span class="line"><span>  xTaskCreate( vTaskCode, &quot;NAME&quot;, STACK_SIZE, &amp;ucParameterToPass, tskIDLE_PRIORITY, &amp;xHandle );</span></span>
<span class="line"><span>  configASSERT( xHandle );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Use the handle to delete the task.</span></span>
<span class="line"><span>if( xHandle != NULL )</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>     vTaskDelete( xHandle );</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="_5-4-如何实现uart与freertos结合的项目目标" tabindex="-1">5.4 如何实现UART与FreeRTOS结合的项目目标？ <a class="header-anchor" href="#_5-4-如何实现uart与freertos结合的项目目标" aria-label="Permalink to &quot;5.4 如何实现UART与FreeRTOS结合的项目目标？&quot;">​</a></h3><ol><li>绿色的灯每间隔100毫秒（Ms）闪烁一次，要求无限循环闪烁</li><li>红色的LED灯每间隔1.5秒（s）闪烁一次，也同样要求无限循环闪烁</li></ol><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void app_main(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	 while(1){</span></span>
<span class="line"><span>		gpio_set_level(GPIO_NUM_2, 1);	// 开灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(100));</span></span>
<span class="line"><span>		gpio_set_level(GPIO_NUM_2, 0);	// 关灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(100));	// 100毫秒</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		gpio_set_level(GPIO_NUM_4, 1);	// 开灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(1500));</span></span>
<span class="line"><span>		gpio_set_level(GPIO_NUM_4, 0);	// 关灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(1500));	// 1.5秒		</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="_5-4-1-代码实现uart与freertos结合" tabindex="-1">5.4.1 代码实现UART与FreeRTOS结合 <a class="header-anchor" href="#_5-4-1-代码实现uart与freertos结合" aria-label="Permalink to &quot;5.4.1 代码实现UART与FreeRTOS结合&quot;">​</a></h4><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &quot;driver/gpio.h&quot;</span></span>
<span class="line"><span>#include &quot;freertos/FreeRTOS.h&quot;</span></span>
<span class="line"><span>#include &quot;freertos/task.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>void led_green_2(void *pvParameters){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for(;;){</span></span>
<span class="line"><span>        gpio_set_level(GPIO_NUM_2, 1);	// 开灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(100));</span></span>
<span class="line"><span>		gpio_set_level(GPIO_NUM_2, 0);	// 关灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(100));	// 100毫秒</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>void led_red_4(void * pvParameters){</span></span>
<span class="line"><span>    for(;;){</span></span>
<span class="line"><span>        gpio_set_level(GPIO_NUM_4, 1);	// 开灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(1500));</span></span>
<span class="line"><span>		gpio_set_level(GPIO_NUM_4, 0);	// 关灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(1500));	// 1.5秒</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>void app_main(void)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // 一、配置GPIO结构，再使能GPIO</span></span>
<span class="line"><span>    gpio_config_t my_gpio_config = {</span></span>
<span class="line"><span>        .pin_bit_mask = (1ULL &lt;&lt; GPIO_NUM_2) | (1ULL &lt;&lt; GPIO_NUM_4),</span></span>
<span class="line"><span>        .mode = GPIO_MODE_OUTPUT,</span></span>
<span class="line"><span>        .pull_down_en = GPIO_PULLDOWN_DISABLE,</span></span>
<span class="line"><span>        .pull_up_en = GPIO_PULLUP_DISABLE,</span></span>
<span class="line"><span>        .intr_type = GPIO_INTR_DISABLE,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    gpio_config(&amp;my_gpio_config);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 二、创建FreeRTOS task，封装task任务函数，最后传参到xTaskCreate()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    xTaskCreate(led_green_2, &quot;led_green_2&quot;, 2048, NULL, 0, NULL);</span></span>
<span class="line"><span>    xTaskCreate(led_red_4, &quot;led_red_4&quot;, 1024, NULL, 0, NULL);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2><h2 id="六、什么是uart中断-queue队列-非阻塞等待任务触发" tabindex="-1">六、什么是UART中断（Queue队列+非阻塞等待任务触发）？ <a class="header-anchor" href="#六、什么是uart中断-queue队列-非阻塞等待任务触发" aria-label="Permalink to &quot;六、什么是UART中断（Queue队列+非阻塞等待任务触发）？&quot;">​</a></h2><h3 id="_6-0-如何理解中断概念" tabindex="-1">6.0 如何理解中断概念？ <a class="header-anchor" href="#_6-0-如何理解中断概念" aria-label="Permalink to &quot;6.0 如何理解中断概念？&quot;">​</a></h3><ol><li>中断的概念</li><li>中断优先级的概念</li><li>中断处理机制</li></ol><p><img src="`+u+'" alt="中断的概念（门主引擎）"></p><p><img src="'+_+'" alt="中断优先级的概念（门主引擎）"></p><p><img src="'+m+'" alt="中断处理机制（门主引擎）"></p><p><img src="'+o+'" alt="中断处理机制（门主引擎）"></p><p><img src="'+d+'" alt="中断机制漫画解读 中断优先级排序"></p><p><img src="'+T+'" alt="中断机制漫画解读 中断优先级排序2"></p><h3 id="_6-1-esp-idf框架下esp32-s3中断与stm32中断比对" tabindex="-1">6.1 ESP-IDF框架下ESP32-S3中断与STM32中断比对 <a class="header-anchor" href="#_6-1-esp-idf框架下esp32-s3中断与stm32中断比对" aria-label="Permalink to &quot;6.1 ESP-IDF框架下ESP32-S3中断与STM32中断比对&quot;">​</a></h3><h4 id="_1-不同单片机的中断处理流程对比-stm32-vs-esp32-对比图" tabindex="-1">1. 不同单片机的中断处理流程对比：STM32 vs ESP32 对比图 <a class="header-anchor" href="#_1-不同单片机的中断处理流程对比-stm32-vs-esp32-对比图" aria-label="Permalink to &quot;1. 不同单片机的中断处理流程对比：STM32 vs ESP32 对比图&quot;">​</a></h4><p>1.1 STM32（裸机）：<br> 中断 → 直接进 ISR → 点亮 LED<br> ✅ 简单直接</p><p>1.2 ESP32（FreeRTOS）：</p><p>中断 → ISR → ??? → 点亮 LED<br> ❌ ISR 里不能做复杂事！</p><h4 id="_2-解释说明" tabindex="-1">2. 解释说明： <a class="header-anchor" href="#_2-解释说明" aria-label="Permalink to &quot;2. 解释说明：&quot;">​</a></h4><p>“在 ESP32 上，ISR（中断服务函数）运行在高危环境：</p><p>2.1 不能调用大多数 API（比如 printf、malloc）</p><p>2.2 不能访问 Flash（可能卡死）</p><p>2.3 必须快进快出（微秒级）</p><h4 id="_3-所以-这就是为什么esp-idf官方禁止在-isr-里直接处理业务逻辑" tabindex="-1">3. 所以，这就是为什么ESP-IDF官方禁止在 ISR 里直接处理业务逻辑 <a class="header-anchor" href="#_3-所以-这就是为什么esp-idf官方禁止在-isr-里直接处理业务逻辑" aria-label="Permalink to &quot;3. 所以，这就是为什么ESP-IDF官方禁止在 ISR 里直接处理业务逻辑&quot;">​</a></h4><p>那怎么办？答案是：让 ISR 只发一个‘通知’，真正的处理交给后台任务！”</p><p>3.1 这里的ISR（中断服务函数）就类似于战争时期指挥部的通信兵，</p><p>3.2 首先侦察兵接收到前方突发敌袭、炮轰（也就是中断源触发了），</p><p>3.3 然后经过中断矩阵（侦察兵经过营地找通信兵），</p><p>3.4 通信兵接收到消息后应该要立刻将敌袭消息发送到队列，任务获取Queue队列的消息，执行任务</p><p>3.5 ISR接下来继续等待中断源通道（侦察兵）再次来消息即可</p><p>🚨 严重错误！</p><p>3.4.1 ISR必须响应极快，而不是先去拉泡屎、撒泡尿、吃个饭、撩下妹再来发送敌袭消息，延误了战机要拉出去执行军令状的。</p><p><img src="'+h+'" alt="ESP-IDF框架下ESP32-S3中断比对"></p><p><img src="'+f+'" alt="关于 ISR 的图片 胡闹"></p><h3 id="_6-2-中断前置知识-freerto之queue队列-多任务" tabindex="-1">6.2 中断前置知识（FreeRTO之Queue队列+多任务） <a class="header-anchor" href="#_6-2-中断前置知识-freerto之queue队列-多任务" aria-label="Permalink to &quot;6.2 中断前置知识（FreeRTO之Queue队列+多任务）&quot;">​</a></h3><p>💡 Tip</p><ul><li>队列可以跨任务通信传递消息</li></ul><table tabindex="0"><thead><tr><th>章节编号</th><th>章节名称</th><th>核心内容（小白友好版）</th><th>时长占比</th><th>官方文档对标</th></tr></thead><tbody><tr><td>0</td><td>课前回顾 &amp; 预告</td><td>1. 回顾已讲：UART 轮询控制 LED（官方 1-4 步）； 2. 抛出痛点：轮询延迟高、占 CPU； 3. 预告：用中断 + FreeRTOS 解决，今天学 2 个核心：队列 / 任务 + UART 中断</td><td>2 分钟</td><td>无（衔接内容）</td></tr><tr><td>1</td><td>前置知识：FreeRTOS 队列 &amp; 任务（仅讲和 UART 中断相关的）</td><td>1. 队列（Queue）： - 比喻：前台（中断）不能处理复杂工作，把消息丢进 “传达室信箱（队列）”，后台（任务）慢慢取； - 核心 API：xQueueReceive（取消息）； - 关键参数：阻塞时间（portMAX_DELAY= 等不到消息不干活）； 2. 任务（Task）： - 比喻：专门 “处理信箱消息” 的后台员工； - 核心 API：xTaskCreate（雇一个后台员工）； - 关键参数：优先级（员工优先级高于前台）； 3. 中断 + 队列 + 任务的关系：画流程图（中断→队列→任务）</td><td>5 分钟</td><td><a href="https://documentation.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/freertos.html" target="_blank" rel="noreferrer">FreeRTOS 官方文档</a></td></tr><tr><td>2</td><td>官方流程第 5 步：UART 中断（核心）</td><td>按官方流程拆解，只讲 “使用中断” 的关键步骤： 1. 步骤 1：修改uart_driver_install（创建队列，官方第一步）； 2. 步骤 2：配置 UART 中断阈值（1 字节触发）； 3. 步骤 3：启用 UART 接收中断； 4. 步骤 4：创建事件处理任务（读取队列 + 控制 LED）</td><td>8 分钟</td><td><a href="https://documentation.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/peripherals/uart.html#uart-api-using-interrupts" target="_blank" rel="noreferrer">UART 中断官方文档</a></td></tr><tr><td>3</td><td>代码实战 &amp; 效果演示</td><td>1. 逐行讲解修改后的代码（标注新增 / 修改）； 2. 烧录测试： - 发 1→LED 立即亮（无 500ms 延迟）； - 发 0→LED 立即灭； - 快速发 1010→LED 快速闪烁（对比轮询的卡顿）； 3. 打印日志：主任务空闲（证明不占 CPU）</td><td>4 分钟</td><td>无（实战验证）</td></tr><tr><td>4</td><td>避坑指南 &amp; 答疑</td><td>1. 常见坑： - 坑 1：队列没创建（uart_driver_install队列参数错）→ 解决：检查第 6 个参数； - 坑 2：中断阈值设太大→ 解决：设为 1； - 坑 3：任务栈太小→ 解决：设 4096； 2. 答疑：为什么中断标志位设 0？（官方默认配置）</td><td>2 分钟</td><td>UART 驱动安装 API 文档</td></tr><tr><td>5</td><td>总结 &amp; 拓展</td><td>1. 核心总结：3 个关键点（队列传消息、任务处理、1 字节触发中断）； 2. 拓展：下节课讲模式检测中断（识别 +++）</td><td>1 分钟</td><td>无</td></tr></tbody></table><p><img src="'+g+'" alt="FreeRTOS关于Queue队列前置知识"></p><h3 id="_6-3-esp-idf的uart中断事件处理流程是怎么样的" tabindex="-1">6.3 ESP-IDF的UART中断事件处理流程是怎么样的？ <a class="header-anchor" href="#_6-3-esp-idf的uart中断事件处理流程是怎么样的" aria-label="Permalink to &quot;6.3 ESP-IDF的UART中断事件处理流程是怎么样的？&quot;">​</a></h3><p>你配置 uart_intr_config_t<br> ↓<br> UART 硬件在满足条件时产生中断（如 RX 超时）<br> ↓<br> ESP-IDF 的 UART ISR 被调用<br> ↓<br> ISR 将硬件中断“翻译”成 uart_event_type_t（如 UART_DATA）<br> ↓<br> 事件被放入你创建的 uart_event_queue<br> ↓<br> 你的任务通过 xQueueReceive() 读取 uart_event_t 并处理</p><p><img src="'+R+`" alt="ESP-IDF的UART中断事件处理流程"></p><h3 id="_6-4-中断esp-idf官方示例代码讲了什么" tabindex="-1">6.4 中断ESP-IDF官方示例代码讲了什么？ <a class="header-anchor" href="#_6-4-中断esp-idf官方示例代码讲了什么" aria-label="Permalink to &quot;6.4 中断ESP-IDF官方示例代码讲了什么？&quot;">​</a></h3><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const uart_port_t uart_num = UART_NUM_2;</span></span>
<span class="line"><span>// Configure a UART interrupt threshold and timeout</span></span>
<span class="line"><span>uart_intr_config_t uart_intr = {</span></span>
<span class="line"><span>    .intr_enable_mask = UART_INTR_RXFIFO_FULL | UART_INTR_RXFIFO_TOUT,</span></span>
<span class="line"><span>    .rxfifo_full_thresh = 100,</span></span>
<span class="line"><span>    .rx_timeout_thresh = 10,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>ESP_ERROR_CHECK(uart_intr_config(uart_num, &amp;uart_intr));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Enable UART RX FIFO full threshold and timeout interrupts</span></span>
<span class="line"><span>ESP_ERROR_CHECK(uart_enable_rx_intr(uart_num));</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><img src="`+U+'" alt="ESP32-S3 UART中断控制LED点亮流程示意图"></p><h3 id="_6-5-uart中断流程代码步骤如何编写" tabindex="-1">6.5 UART中断流程代码步骤如何编写？ <a class="header-anchor" href="#_6-5-uart中断流程代码步骤如何编写" aria-label="Permalink to &quot;6.5 UART中断流程代码步骤如何编写？&quot;">​</a></h3><p><a href="https://documentation.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/freertos_idf.html#id24" target="_blank" rel="noreferrer">https://documentation.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/freertos_idf.html#id24</a></p><ol><li>创建Queue队列句柄，方便后期使用队列句柄传送中断消息给任务函数（中断 + 队列 + 任务的关系：（中断→队列→任务））</li><li>配置GPIO结构体，并使能GPIO（2颗LED灯）</li><li>配置UART及UART中断 <ol><li>安装驱动程序 - 为 UART 驱动程序分配 ESP32-S3 资源 <ol><li>步骤 1：修改uart_driver_install（创建队列，官方第一步）；</li></ol></li><li>设置通信参数 - 设置波特率、数据位、停止位等</li><li>设置通信管脚 - 分配连接设备的管脚</li><li>运行 UART 通信 - 发送/接收数据</li><li>使用中断 - 触发特定通信事件的中断 <ol><li>步骤 2：配置 UART 中断阈值（1 字节触发）；</li><li>步骤 3：启用 UART 接收中断；</li></ol></li></ol></li><li>创建事件处理任务（读取队列 + 控制 LED） <ol><li>创建FreeRTO Task任务，</li><li>创建Task任务的同时，编写并封装好中断服务函数</li><li>Task任务①为GPIO2号绿色LED灯每隔100毫秒闪烁一次</li><li>Task任务②为GPIO4号红色LED灯被UART中断控制（中断触发→队列传送中断被触发的消息→Task任务②唤醒并执行任务）</li></ol></li></ol><p><img src="'+A+`" alt="UART中断流程代码编写步骤"></p><h3 id="_6-6-代码实现uart中断-queue队列-非阻塞等待任务触发" tabindex="-1">6.6 代码实现UART中断（Queue队列+非阻塞等待任务触发） <a class="header-anchor" href="#_6-6-代码实现uart中断-queue队列-非阻塞等待任务触发" aria-label="Permalink to &quot;6.6 代码实现UART中断（Queue队列+非阻塞等待任务触发）&quot;">​</a></h3><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &quot;driver/gpio.h&quot;</span></span>
<span class="line"><span>#include &quot;freertos/FreeRTOS.h&quot;</span></span>
<span class="line"><span>#include &quot;freertos/task.h&quot;</span></span>
<span class="line"><span>#include &quot;driver/uart.h&quot;</span></span>
<span class="line"><span>#include &quot;hal/uart_hal.h&quot;</span></span>
<span class="line"><span>#include &quot;esp_log.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 新增：队列句柄（中断事件的“中转站”）</span></span>
<span class="line"><span>QueueHandle_t my_uart_intr_queue_handle;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void my_led_initialize(void){</span></span>
<span class="line"><span>    gpio_config_t my_gpio_config = {</span></span>
<span class="line"><span>        .pin_bit_mask = (1ULL &lt;&lt; GPIO_NUM_2) | (1ULL &lt;&lt; GPIO_NUM_4),</span></span>
<span class="line"><span>        .mode = GPIO_MODE_OUTPUT,</span></span>
<span class="line"><span>        .pull_down_en = GPIO_PULLDOWN_DISABLE,</span></span>
<span class="line"><span>        .pull_up_en = GPIO_PULLUP_DISABLE,</span></span>
<span class="line"><span>        .intr_type = GPIO_INTR_DISABLE,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    gpio_config(&amp;my_gpio_config);</span></span>
<span class="line"><span>    gpio_set_level(GPIO_NUM_4, 0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>void led_green_2(void *pvParameters){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for(;;){</span></span>
<span class="line"><span>        gpio_set_level(GPIO_NUM_2, 1);	// 开灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(100));</span></span>
<span class="line"><span>		gpio_set_level(GPIO_NUM_2, 0);	// 关灯</span></span>
<span class="line"><span>		vTaskDelay(pdMS_TO_TICKS(100));	// 100毫秒</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>void led_red_4(void * pvParameters)</span></span>
<span class="line"><span>{   uart_event_t my_uart_intr_event_type;</span></span>
<span class="line"><span>    uint8_t rx_buffer_zone[128];</span></span>
<span class="line"><span>    for(;;)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        if(xQueueReceive(my_uart_intr_queue_handle, &amp;my_uart_intr_event_type, portMAX_DELAY)){</span></span>
<span class="line"><span>            if( my_uart_intr_event_type.type == UART_DATA &amp;&amp; my_uart_intr_event_type.size &gt; 0){</span></span>
<span class="line"><span>                ESP_LOGI(&quot;uart_intr_trigger&quot;, &quot;bytes length: %d&quot;, my_uart_intr_event_type.size);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                uart_read_bytes(UART_NUM_0, rx_buffer_zone, my_uart_intr_event_type.size, pdMS_TO_TICKS(100));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                if (my_uart_intr_event_type.size &gt;= 6 &amp;&amp;  memcmp(rx_buffer_zone, &quot;led_on&quot;, 6) == 0 ){</span></span>
<span class="line"><span>                    gpio_set_level(GPIO_NUM_4, 1);</span></span>
<span class="line"><span>                    ESP_LOGI(&quot;Received CMD&quot;, &quot;LED ON!&quot;);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                if (my_uart_intr_event_type.size &gt;= 7 &amp;&amp; memcmp(rx_buffer_zone, &quot;led_off&quot;, 7) == 0 ){</span></span>
<span class="line"><span>                    gpio_set_level(GPIO_NUM_4, 0);</span></span>
<span class="line"><span>                    ESP_LOGI(&quot;Received CMD&quot;, &quot;LED OFF!&quot;);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>void app_main(void)</span></span>
<span class="line"><span>{   /*一、配置GPIO结构，再使能GPIO*/</span></span>
<span class="line"><span>    my_led_initialize();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /*二、注册UART及启动中断，配置UART结构体parameters并使能，配置UART RX以及TX引脚*/</span></span>
<span class="line"><span>    uart_config_t my_uart_tele_config = {</span></span>
<span class="line"><span>        .baud_rate = 115200,</span></span>
<span class="line"><span>        .data_bits = UART_DATA_8_BITS,</span></span>
<span class="line"><span>        .flow_ctrl = UART_HW_FLOWCTRL_DISABLE,</span></span>
<span class="line"><span>        .parity = UART_PARITY_DISABLE,</span></span>
<span class="line"><span>        .stop_bits = UART_STOP_BITS_1,</span></span>
<span class="line"><span>        .source_clk = UART_SCLK_DEFAULT,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    uart_driver_install(UART_NUM_0, 1024, 0, 2, &amp;my_uart_intr_queue_handle, 0);</span></span>
<span class="line"><span>    uart_param_config(UART_NUM_0, &amp;my_uart_tele_config);</span></span>
<span class="line"><span>    uart_set_pin(UART_NUM_0, GPIO_NUM_43, GPIO_NUM_44, UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /*三、显示配置UART中断参数并启用uart intr config() */</span></span>
<span class="line"><span>    uart_intr_config_t my_uart_intr_config = {</span></span>
<span class="line"><span>        .intr_enable_mask = UART_INTR_RXFIFO_FULL | UART_INTR_RXFIFO_TOUT,</span></span>
<span class="line"><span>        .rx_timeout_thresh = 10,</span></span>
<span class="line"><span>        .rxfifo_full_thresh = 64,</span></span>
<span class="line"><span>        .txfifo_empty_intr_thresh = 0,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    ESP_ERROR_CHECK( uart_intr_config(UART_NUM_0, &amp;my_uart_intr_config) );</span></span>
<span class="line"><span>    /* 使能rx环形缓冲区中断 */</span></span>
<span class="line"><span>    ESP_ERROR_CHECK( uart_enable_rx_intr(UART_NUM_0) );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /*四、创建FreeRTOS task，封装task任务函数，最后传参到xTaskCreate()*/</span></span>
<span class="line"><span>    xTaskCreate(led_green_2, &quot;led_green_2&quot;, 1024, NULL, 0, NULL);</span></span>
<span class="line"><span>    xTaskCreate(led_red_4, &quot;led_red_4&quot;, 2048, NULL, 0, NULL);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br></div></div><div class="language-plain vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &quot;freertos/FreeRTOS.h&quot;</span></span>
<span class="line"><span>#include &quot;freertos/task.h&quot;</span></span>
<span class="line"><span>#include &quot;driver/uart.h&quot;</span></span>
<span class="line"><span>#include &quot;driver/gpio.h&quot;</span></span>
<span class="line"><span>#include &quot;string.h&quot;</span></span>
<span class="line"><span>#include &quot;esp_log.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 你UART的引脚定义</span></span>
<span class="line"><span>#define tx_pin GPIO_NUM_43</span></span>
<span class="line"><span>#define rx_pin GPIO_NUM_44</span></span>
<span class="line"><span>// 新增：日志标签（方便调试）</span></span>
<span class="line"><span>#define TAG &quot;UART_INTERRUPT&quot;</span></span>
<span class="line"><span>// 新增：队列句柄（中断事件的“中转站”）</span></span>
<span class="line"><span>QueueHandle_t uart_event_queue;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// LED GPIO初始化</span></span>
<span class="line"><span>void led_init(void) {</span></span>
<span class="line"><span>    gpio_config_t my_led_gpio_config = {0};</span></span>
<span class="line"><span>    my_led_gpio_config.pin_bit_mask = 1ULL &lt;&lt; GPIO_NUM_2;</span></span>
<span class="line"><span>    my_led_gpio_config.mode = GPIO_MODE_OUTPUT;</span></span>
<span class="line"><span>    my_led_gpio_config.pull_down_en = GPIO_PULLDOWN_DISABLE;</span></span>
<span class="line"><span>    my_led_gpio_config.pull_up_en = GPIO_PULLUP_DISABLE;</span></span>
<span class="line"><span>    my_led_gpio_config.intr_type = GPIO_INTR_DISABLE;</span></span>
<span class="line"><span>    gpio_config(&amp;my_led_gpio_config);</span></span>
<span class="line"><span>    // 新增：初始熄灭LED</span></span>
<span class="line"><span>    gpio_set_level(GPIO_NUM_2, 0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 新增：UART事件处理任务（专门处理中断事件，FreeRTOS核心）</span></span>
<span class="line"><span>void uart_event_task(void *arg) {</span></span>
<span class="line"><span>    uart_event_t event;  // UART事件结构体（SDK定义）</span></span>
<span class="line"><span>    size_t buffered_len;</span></span>
<span class="line"><span>    uint8_t data[128] = {0};  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 死循环：一直等待队列中的中断事件（理解：“一直看短信”）</span></span>
<span class="line"><span>    for(;;) {</span></span>
<span class="line"><span>        // 从队列读取事件：portMAX_DELAY=永久阻塞，直到有事件</span></span>
<span class="line"><span>        if (xQueueReceive(uart_event_queue, &amp;event, portMAX_DELAY)) {</span></span>
<span class="line"><span>            switch (event.type) {</span></span>
<span class="line"><span>                // 事件1：收到UART数据（中断触发）</span></span>
<span class="line"><span>                case UART_DATA:</span></span>
<span class="line"><span>                    // 获取缓冲区中的数据长度（替代你原来的uart_get_buffered_data_len）</span></span>
<span class="line"><span>                    uart_get_buffered_data_len(UART_NUM_0, &amp;buffered_len);</span></span>
<span class="line"><span>                    // 读取数据，UART核心控制器读取接收数据缓冲区数据</span></span>
<span class="line"><span>                    int rxBytes = uart_read_bytes(UART_NUM_0, data, buffered_len, 100);</span></span>
<span class="line"><span>                    if (rxBytes &gt; 0) {</span></span>
<span class="line"><span>                        data[rxBytes] = 0;  // 字符串结束符</span></span>
<span class="line"><span>                        ESP_LOGI(TAG, &quot;收到数据：%s&quot;, data);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        // 原来的LED控制逻辑</span></span>
<span class="line"><span>                        if (data[0] == &#39;1&#39;) {</span></span>
<span class="line"><span>                            gpio_set_level(GPIO_NUM_2, 1);</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        if (data[0] == &#39;0&#39;) {</span></span>
<span class="line"><span>                            gpio_set_level(GPIO_NUM_2, 0);</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 事件2：FIFO溢出（避坑：数据太多没及时处理）</span></span>
<span class="line"><span>                case UART_FIFO_OVF:</span></span>
<span class="line"><span>                    ESP_LOGE(TAG, &quot;警告：UART FIFO溢出！&quot;);</span></span>
<span class="line"><span>                    uart_flush(UART_NUM_0);  // 清空缓冲区</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 其他事件（可暂时忽略，留拓展空间）</span></span>
<span class="line"><span>                default:</span></span>
<span class="line"><span>                    ESP_LOGW(TAG, &quot;未处理的UART事件：%d&quot;, event.type);</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 任务删除（实际不会执行到）</span></span>
<span class="line"><span>    vTaskDelete(NULL);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void app_main(void) {</span></span>
<span class="line"><span>    // 保留：LED初始化</span></span>
<span class="line"><span>    led_init();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // UART配置结构体（仅新增注释，内容不变）</span></span>
<span class="line"><span>    uart_config_t my_uart_config = {0};</span></span>
<span class="line"><span>    my_uart_config.baud_rate = 115200;</span></span>
<span class="line"><span>    my_uart_config.data_bits = UART_DATA_8_BITS;</span></span>
<span class="line"><span>    my_uart_config.parity = UART_PARITY_DISABLE;</span></span>
<span class="line"><span>    my_uart_config.stop_bits = UART_STOP_BITS_1;</span></span>
<span class="line"><span>    my_uart_config.flow_ctrl = UART_HW_FLOWCTRL_DISABLE;</span></span>
<span class="line"><span>    my_uart_config.source_clk = UART_SCLK_DEFAULT;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 修改：uart_driver_install（新增队列参数，核心改动！）</span></span>
<span class="line"><span>    // 原代码：uart_driver_install(UART_NUM_0, 1024, 0, 0, NULL, 0);</span></span>
<span class="line"><span>    // 新代码：最后4个参数：队列深度=5，队列句柄=uart_event_queue，中断标志=0</span></span>
<span class="line"><span>    uart_driver_install(UART_NUM_0, 1024, 0, 5, &amp;uart_event_queue, 0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // UART参数配置</span></span>
<span class="line"><span>    uart_param_config(UART_NUM_0, &amp;my_uart_config);</span></span>
<span class="line"><span>    // UART引脚配置</span></span>
<span class="line"><span>    uart_set_pin(UART_NUM_0, tx_pin, rx_pin, UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 新增：UART中断配置（重点：设置1字节触发中断）</span></span>
<span class="line"><span>    uart_intr_config_t uart_intr = {0};</span></span>
<span class="line"><span>    uart_intr.intr_enable_mask = UART_INTR_RXFIFO_FULL | UART_INTR_RXFIFO_TOUT;</span></span>
<span class="line"><span>    uart_intr.rxfifo_full_thresh = 1;  // 收到1个字节就触发中断（无延迟）</span></span>
<span class="line"><span>    uart_intr.rx_timeout_thresh = 10;  // 超时阈值（防止漏数据）</span></span>
<span class="line"><span>    uart_intr_config(UART_NUM_0, &amp;uart_intr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 新增：启用UART接收中断（SDK自动处理底层中断矩阵）</span></span>
<span class="line"><span>    uart_enable_rx_intr(UART_NUM_0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 新增：创建FreeRTOS任务（处理UART事件）</span></span>
<span class="line"><span>    // 参数：任务函数、任务名、栈大小、参数、优先级、任务句柄</span></span>
<span class="line"><span>    xTaskCreate(</span></span>
<span class="line"><span>        uart_event_task,   // 任务函数（上面定义的）</span></span>
<span class="line"><span>        &quot;uart_event_task&quot;,</span><span> // 任务名（给任务起个名字）</span></span>
<span class="line"><span>        4096,              // 栈大小（4096足够，不用改）</span></span>
<span class="line"><span>        NULL,              // 任务参数（无）</span></span>
<span class="line"><span>        10,                // 优先级（高于主任务的默认优先级1）</span></span>
<span class="line"><span>        NULL               // 任务句柄（不用保存）</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 修改：主循环（去掉轮询逻辑，改为“闲任务”）</span></span>
<span class="line"><span>    // 原代码：while(1)轮询读取UART数据</span></span>
<span class="line"><span>    // 新代码：主任务只打印日志，证明不占CPU</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        ESP_LOGI(TAG, &quot;主任务运行中（CPU空闲）...&quot;);</span></span>
<span class="line"><span>        vTaskDelay(pdMS_TO_TICKS(1000));  // 1秒打印一次</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br></div></div>`,71)])])}const D=e(P,[["render",S]]);export{L as __pageData,D as default};
