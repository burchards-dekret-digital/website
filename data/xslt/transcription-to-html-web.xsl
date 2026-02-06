<xsl:stylesheet xmlns:saxon="http://saxon.sf.net" xmlns:local="http://www.w3.org/2005/xquery-local-functions" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0" xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs local">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>

    <xsl:template match="TEI">
        <xsl:apply-templates select="text/body/*"/>
    </xsl:template>


    <xsl:template match="lb">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <br class="tei_lb {$taxonomy}"/>
    </xsl:template>
 
    <xsl:template match="lb[@break='no']">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <br class="tei_lb nobreak {$taxonomy}"/>
    </xsl:template>
    
    <xsl:template match="lb[ancestor::del]">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <br class="tei_lb {$taxonomy}"/><span class="erased-lb">__</span>
    </xsl:template>

    <xsl:template match="//div">
        <div class="tei_{@type}" id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-{@type}-{@n}" data-canvas="{preceding::pb[1]/@corresp}#xywh={preceding::lb[1]/@facs}">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//div[@type='book']">
        <div class="tei_{@type}" id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-{@type}-{@n}">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//div[@type='toc']">
        <div class="tei_{@type}" id="{@xml:id}" data-canvas="{preceding::pb[1]/@corresp}">
            <!--<button class="icon-chapter-mirador" title="See in Mirador" ><i class="fa-solid fa-eye"/></button>-->
            <button class="btn btn-light btn-sm mb-1 me-1 icon-chapter-mirador" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;siehe Capitulatio im Digitalisat&lt;/span&gt;&lt;span lang='en'&gt;See Capitulatio in the digital copy&lt;/span&gt;"><i class="fa-solid fa-eye"/></button>
        <xsl:apply-templates/>
        </div>
    </xsl:template>
        
    <xsl:template match="//div[@type='chapter' or @type='interrogation' or @type='paratext']">    
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!-- Split by whitespace and select the first id (token) -->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>    
        
        <!-- Process ana attribute -->
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        
        <!-- scorresp variable -->
        <!-- Extract corresp targets after # -->
            <xsl:variable name="corresp-chapters-ids" select="string-join(                 for $c in tokenize(@corresp, '\s+')                  return substring-after($c, '#'),                  ' '             )"/>

        <div class="tei_{@type} ms_scribe-{$scribe-id} {$taxonomy} mt-4" id="{@xml:id}" data-corresp="{$corresp-chapters-ids}" data-canvas="{preceding::pb[1]/@corresp}#xywh={preceding::lb[1]/@facs}">
           <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    
   

    
    <!--<xsl:template match="//div[@type='chapter'][@rend='written-on-erased']">
        <xsl:variable name="hand-ref" select="./@hand"/>
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>    
       
        <div class="tei_{@type} ms_scribe-{$scribe-id}" id="{@xml:id}" data-canvas="{preceding::pb[1]/@corresp}#xywh={preceding::lb[1]/@facs}">
            <ins class="tei_delSpan-written-on-erased">
            <xsl:apply-templates/>
            </ins>
        </div>
    </xsl:template>-->
   
   <!--CHECK THIS CODE-->
    <!--<xsl:template match="//div[@type='chapter'][@rend='strikethrough']">
        <xsl:variable name="hand-ref" select="./@hand"/>
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>    
        <div class="tei_{@type} ms_scribe-{$scribe-id}" id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-{@type}-{@n}" data-canvas="{preceding::pb[1]/@corresp}#xywh={preceding::lb[1]/@facs}">
            <ins class="tei_delSpan-strikethrough">
                <xsl:apply-templates/>
            </ins>
        </div>
    </xsl:template>-->
    
    <xsl:template match="//div[@type='praefatiuncula']">    
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!--<xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>-->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>    
       
        <div class="tei_{@type} ms_scribe-{$scribe-id}" id="{@xml:id}">
                <xsl:apply-templates/>
        </div>
        
    </xsl:template>
    
    <xsl:template match="//p">
        <div class="tei_paragraph">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//head[not(@type='chapter-title')]">
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!--<xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>-->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>    
            <h6 class="tei_{@type} ms_scribe-{$scribe-id}">
                <xsl:apply-templates/>
            </h6>
    </xsl:template>
    
    <xsl:template match="//head[@type='chapter-title']">
        <!--<button class="icon-chapter-mirador" title="See in Mirador"><i class="fa-solid fa-eye"/></button>
            <button class="chapter-nav prev-chapter mt-4" title="Previous chapter" onclick="navigateChapter(this, 'prev')"><i class="fa-solid fa-arrow-up-long"/></button>
            <button class="chapter-nav next-chapter mt-4" title="Next chapter" onclick="navigateChapter(this, 'next')"><i class="fa-solid fa-arrow-down-long"/></button>
            <button class="icon-chapter-sync mt-4" title="Sync chapters" onclick="syncChapters(this)"><i class="fa-solid fa-arrows-left-right"/></button>
        -->
        <button class="btn btn-light btn-sm mb-1 me-1 icon-chapter-mirador" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;siehe Kapitel im Digitalisat&lt;/span&gt;&lt;span lang='en'&gt;See chapter in the digital copy&lt;/span&gt;"><i class="fa-solid fa-eye"/></button>
        <button class="btn btn-light btn-sm mb-1 me-1 chapter-nav prev-chapter" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;zum vorherigen Kapitel gehen&lt;/span&gt;&lt;span lang='en'&gt;Go to the previous chapter&lt;/span&gt;" onclick="navigateChapter(this, 'prev')"><i class="fa-solid fa-arrow-up-long"/></button>
        <button class="btn btn-light btn-sm mb-1 me-1 chapter-nav next-chapter" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;zum nächsten Kapitel gehen&lt;/span&gt;&lt;span lang='en'&gt;Go to the next chapter&lt;/span&gt;" onclick="navigateChapter(this, 'next')"><i class="fa-solid fa-arrow-down-long"/></button>
        <button class="btn btn-light btn-sm mb-1 me-1 icon-chapter-sync" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;Kapitel aneinander angleichen&lt;/span&gt;&lt;span lang='en'&gt;Align chapters to each other&lt;/span&gt;" onclick="syncChapters(this)"><i class="fa-solid fa-arrows-left-right"/></button>
        
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        
        <h5 class="tei_{@type} {$taxonomy}">
            <xsl:apply-templates/>
        </h5>
    </xsl:template>
    
    <!--first interrogation-->
    <xsl:template match="div[@type='interrogation']//head[@type='chapter-title']">
        <!--<button class="icon-chapter-mirador" title="See in Mirador"><i class="fa-solid fa-eye"/></button>
        <button class="chapter-nav next-chapter mt-4" title="Next interrogation" onclick="navigateInterrogation(this, 'next')"><i class="fa-solid fa-arrow-down-long"/></button>
        <button class="icon-chapter-sync mt-4" title="Sync interrogations" onclick="syncInterrogations(this)"><i class="fa-solid fa-arrows-left-right"/></button>-->
        
        <button class="btn btn-light btn-sm mb-1 me-1 icon-chapter-mirador" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;siehe Interrogatio im Digitalisat&lt;/span&gt;&lt;span lang='en'&gt;See interrogation in the digital copy&lt;/span&gt;"><i class="fa-solid fa-eye"/></button>
        <button class="btn btn-light btn-sm mb-1 me-1 chapter-nav next-chapter" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;Zur nächsten Interrogatio gehen&lt;/span&gt;&lt;span lang='en'&gt;Go to the next interrogation&lt;/span&gt;" onclick="navigateInterrogation(this, 'next')"><i class="fa-solid fa-arrow-down-long"/></button>
        <button class="btn btn-light btn-sm mb-1 me-1 icon-chapter-sync" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;Interrogationes aneinander angleichen&lt;/span&gt;&lt;span lang='en'&gt;Align interrogations to each other&lt;/span&gt;" onclick="syncInterrogations(this)"><i class="fa-solid fa-arrows-left-right"/></button>
       
        <h5 class="tei_{@type}">
            <xsl:apply-templates/>
        </h5>
    </xsl:template>
    
    <xsl:template match="div[@type='interrogation']//label[@type='chapter-number']">
        <!--<button class="icon-chapter-mirador" title="See in Mirador"><i class="fa-solid fa-eye"/></button>
        <button class="chapter-nav prev-chapter mt-4" title="Previous interrogation" onclick="navigateInterrogation(this, 'prev')"><i class="fa-solid fa-arrow-up-long"/></button>
        <button class="chapter-nav next-chapter mt-4" title="Next interrogation" onclick="navigateInterrogation(this, 'next')"><i class="fa-solid fa-arrow-down-long"/></button>
        <button class="icon-chapter-sync mt-4" title="Sync interrogations" onclick="syncInterrogations(this)"><i class="fa-solid fa-arrows-left-right"/></button>-->
        
        
        <button class="btn btn-light btn-sm mb-1 me-1 icon-chapter-mirador" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;siehe Interrogatio im Digitalisat&lt;/span&gt;&lt;span lang='en'&gt;See interrogation in the digital copy&lt;/span&gt;"><i class="fa-solid fa-eye"/></button>
        <button class="btn btn-light btn-sm mb-1 me-1 chapter-nav prev-chapter" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;Zur vorherigen Interrogatio gehen&lt;/span&gt;&lt;span lang='en'&gt;Go to the previous interrogation&lt;/span&gt;" onclick="navigateInterrogation(this, 'prev')"><i class="fa-solid fa-arrow-up-long"/></button>
        <button class="btn btn-light btn-sm mb-1 me-1 chapter-nav next-chapter" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;Zur nächsten Interrogatio gehen&lt;/span&gt;&lt;span lang='en'&gt;Go to the next interrogation&lt;/span&gt;" onclick="navigateInterrogation(this, 'next')"><i class="fa-solid fa-arrow-down-long"/></button>
        <button class="btn btn-light btn-sm mb-1 me-1 icon-chapter-sync" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="&lt;span lang='de'&gt;Interrogationes aneinander angleichen&lt;/span&gt;&lt;span lang='en'&gt;Align interrogations to each other&lt;/span&gt;" onclick="syncInterrogations(this)"><i class="fa-solid fa-arrows-left-right"/></button>
       <h5 class="tei_{@type}">
            <xsl:apply-templates/>
        </h5>
    </xsl:template>
       
    <xsl:template match="//list">
        <ol>
            <xsl:apply-templates/>
        </ol>
    </xsl:template>

    <xsl:template match="//item">
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!--<xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>-->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>
        
        <!--taxonomy-->
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
         
         <!-- sameAs variable: corresp chapter -->
        <xsl:variable name="corresp-chapter" select="replace(@sameAs, '#', '')"/>
        
            <li id="{@xml:id}" class="ms_scribe-{$scribe-id} {$taxonomy} " data-sameas="{$corresp-chapter}" onclick="linkTocToChapter(this)" onmouseover="changeCursorToHand(this)">
                <xsl:apply-templates/>
            </li>
    </xsl:template>
    
    <!--<xsl:template match="note[@type='inscription']">
         <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <span class="tei_note-inscription {$taxonomy}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>-->
    <xsl:template match="note[@type='inscription']">
      <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!-- Split by whitespace and select the first id (token) -->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/> 

        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        
        <span class="tei_note-inscription ms_scribe-{$scribe-id} {$taxonomy}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="note[@type='contemporary-marginalia']">
        <span class="tei_note-contemporary-marginalia" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Zeitgenössische Marginalie.&lt;/span&gt;&lt;span lang='en'&gt;Contemporary marginalia.&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="note[@type='later-marginalia']">
        <span class="tei_note-later-marginalia" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Spätere Marginalie.&lt;/span&gt;&lt;span lang='en'&gt;Later marginalia.&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="note[@type='contemporary-interlinear']">
        <span class="tei_note-contemporary-interlinear" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Zeitgenössische Interlinearglosse.&lt;/span&gt;&lt;span lang='en'&gt;Contemporary interlinear gloss.&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="note[@type='later-interlinear']">
        <span class="tei_note-later-interlinear" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Spätere Interlinearglosse.&lt;/span&gt;&lt;span lang='en'&gt;Later interlinear gloss.&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="pb">
        <span class="tei_pb"><xsl:apply-templates select="@n|node()"/>a</span>
    </xsl:template>
    <!--<xsl:template match="pb">
        <span class="tei_pb" data-canvas="{@corresp}" onclick="goToPageInMirador('{upper-case(substring(@ana, 14, 1))}', '{@corresp}')">
            <xsl:apply-templates select="@n|node()"/>a</span>
    </xsl:template>-->
    
    <xsl:template match="cb[@n='b']">
        <span class="tei_cb">
            <xsl:apply-templates select="preceding::pb[1]/@n|node()"/>b</span>
    </xsl:template>
    
    <xsl:template match="fw[@type='page-header' ]">
        <span class="tei_fw-page-header">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="fw[@type='quire-numeral' ]">
        <span class="tei_fw-quire-numeral">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
   
    <!-- 3.1 Rote Initialen -->
    <xsl:template match="hi[@rend='color:red initial']">
        <span class="tei_hi-color-red-initial">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <!-- 3.2 Rubrizierung -->
    <xsl:template match="hi[@rend='color:red']">
        <span class="tei_hi-color-red">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="hi[@rend='versal']">
        <span class="tei_hi-versal">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="hi[@rend='color-stroked']">
        <span class="tei_hi-color-stroked">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="//abbr">
        <span class="tei_abbr" style="display:none">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="//expan">
        <span class="tei_expan">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="//seg[@type='pos-of-displaced']">
        <span class="tei_seg_displaced" id="{replace(replace(@corresp,'supp','sod'),'#','')}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
   
    <xsl:template match="//supplied">
        <span class="tei_supplied" id="{@xml:id}">[<xsl:apply-templates/>]</span>
    </xsl:template>
    
    <xsl:template match="//add">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <span class="tei_add {$taxonomy}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
       
    <xsl:template match="//damage//gap[@reason='cut-out']">
        <span class="tei_damage-cut-out" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Beschädigung: ausgeschnitten&lt;/span&gt;&lt;span lang='en'&gt;Damage: cut-out&lt;/span&gt;">
         <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="//damage//gap[@reason='torn-out']">
        <span class="tei_damage-torn-out" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Beschädigung: herausgerissen&lt;/span&gt;&lt;span lang='en'&gt;Damage: torn-out&lt;/span&gt;">
        <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="//damage//gap[@reason='burned']">
        <span class="tei_damage-burned" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Beschädigung: verbrannt&lt;/span&gt;&lt;span lang='en'&gt;Damage: burned&lt;/span&gt;">
         <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="//damage//gap[@reason='trimmed']">
        <span class="tei_damage-trimmed" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Beschädigung: beschnitten&lt;/span&gt;&lt;span lang='en'&gt;Damage: trimmed&lt;/span&gt;">
           <xsl:apply-templates/>
           </span>
    </xsl:template>
    
    <xsl:template match="//del[@rend='strikethrough']">
        <span class="tei_del-strikethrough">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="//del[@rend='blackout']">
        <span class="tei_del-blackout">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="//del[@rend='expunctuation']">
        <span class="tei_del-expunctuation" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Expunktion&lt;/span&gt;&lt;span lang='en'&gt;Expunctuation&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="//del[@rend='correction']">
        <span class="tei_del-correction" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Korrektur&lt;/span&gt;&lt;span lang='en'&gt;Correction&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="//del[@rend='underlined']">
        <span class="tei_del-underlined">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    
    <!-- 3.7 Rasuren ohne Ersetzung als Span mit Scherensymbol -->
    <xsl:template match="//del[@rend='erasure'][not(ancestor::subst) and not(child::lb)]">
        <!-- Process ana attribute -->
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        
        <span class="tei_erasure-without-substitution {$taxonomy}">__</span>
    </xsl:template>
    
    <!-- 3.8 Rasuren mit Ersetzung als Span (in der Praxis in Kombination mit 3.4)-->
    <xsl:template match="//subst">
        <span class="tei_subst">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    
    <xsl:template match="del[@rend='erasure'][node()][not(child::lb)]">
        <span class="tei_erasure-visible" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Rasur&lt;/span&gt;&lt;span lang='en'&gt;Erasure&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    
    <xsl:template match="g">
        <span class="tei_g">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="sic">
        <span class="tei_sic">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="measure[@type='duration-of-penance']">
        <span class="tei_measure" type="{@type}" quantity="{@quantity}" unit="{@unit}" data-bs-toggle="tooltip" data-bs-html="true"> 
            <xsl:attribute name="data-bs-title">
                <xsl:text>&lt;span lang='de'&gt;Dauer der Buße: </xsl:text>
                <xsl:value-of select="@quantity"/>
                <xsl:text> Tage.&lt;/span&gt;&lt;span lang='en'&gt;Duration of penance: </xsl:text>
                <xsl:value-of select="@quantity"/>
                <xsl:text> days.&lt;/span&gt;</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="measure[@type='fine']">
        <span class="tei_measure" type="{@type}" quantity="{@quantity}" unit="{@unit}" data-bs-toggle="tooltip" data-bs-html="true">
            <xsl:attribute name="data-bs-title">
                <xsl:text>&lt;span lang='de'&gt;Bußgeld: </xsl:text>
                <xsl:value-of select="@quantity"/>
                <xsl:text> solidus.&lt;/span&gt;&lt;span lang='en'&gt;Fine: </xsl:text>
                <xsl:value-of select="@quantity"/>
                <xsl:text> solidus.&lt;/span&gt;</xsl:text>
            </xsl:attribute>
            
            
            data-bs-title="&lt;span lang='de'&gt;Bußgeld.&lt;/span&gt;&lt;span lang='en'&gt;Fine.&lt;/span&gt;"&gt;
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="num">
        <span class="tei_num" value="{@value}" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="{@value}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="unclear">
        <span class="tei_unclear" cert="{@cert}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <!--<xsl:template match="//delSpan[@rend='written-on-erased']">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <ins class="tei_delSpan-start-written-on-erased {$taxonomy}">
            <xsl:apply-templates/>
        </ins>
    </xsl:template>

    <xsl:template match="//delSpan[@rend='strikethrough']">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <ins class="tei_delSpan-start-strikethrough {$taxonomy}">
            <xsl:apply-templates/>
        </ins>
    </xsl:template>

   <xsl:template match="//div[@rend='written-on-erased-partly']//anchor">
        <ins class="tei_delSpan-written-on-erased-end">
            <xsl:apply-templates/>
        </ins>
    </xsl:template>
    
    <xsl:template match="//div[@rend='strikethrough-partly']//anchor">
        <ins class="tei_delSpan-strikethrough-end">
            <xsl:apply-templates/>
        </ins>
    </xsl:template>-->
    
    <xsl:template match="delSpan">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <span class="tei_delSpan {@rend} {$taxonomy}" delSpan_target="{substring-after(@spanTo, '#')}"/>
            
    </xsl:template>
    
    <xsl:template match="addSpan">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <span class="tei_addSpan {$taxonomy}" addSpan_target="{substring-after(@spanTo, '#')}"/>
                
    </xsl:template>
    
    <xsl:template match="anchor">
        <span class="tei_anchor" id="{@xml:id}"/>
    </xsl:template>
    
    

    <!-- Handshift -->
    <xsl:template match="//handShift">
        <!-- get data for hand Name --> 
        <xsl:variable name="hand-ref" select="./@new"/>
        <!--<xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>-->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        
        <!-- get data for scribe Name -->
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>
        <xsl:variable name="scribe" select="document('../../../../collections/bdd/data/register/scribes.xml')//person[@xml:id=$scribe-id]"/>
        
        <!-- get iiif coordinats and image link-->
        <xsl:variable name="pb-image" select="preceding::pb[1]/@facs"/>
        <xsl:variable name="iiif-coordinates" select="preceding::lb[1]/@facs"/>
        <xsl:variable name="handSchift-image" select="replace($pb-image,'full/full',concat($iiif-coordinates,'/full'))"/>

        <!-- get iiif coordinats and image link-->
        <xsl:variable name="pb-canvas" select="preceding::pb[1]/@corresp"/>
        <xsl:variable name="iiif-coordinates" select="preceding::lb[1]/@facs"/>
        <xsl:variable name="handSchift-iiif" select="concat($pb-canvas,'#xywh=',$iiif-coordinates)"/>
        

        <span class="tei_handShift-wrapper ms_scribe-{$scribe-id}">
            <span class="tei_handShift-icon" onclick="openHandShiftInMirador('{$handSchift-iiif}','{@new}')"><img src="https://www.svgrepo.com/show/11315/hand-and-pen.svg" style="width: 25px"/></span>
            <span class="tei_handShift-info">
                <span class="ms_hand-name">
                        <xsl:value-of select="replace(//handNote[@xml:id=$hand-id]/text(),'\.','')"/><!--,
                        <xsl:value-of select="$scribe/name/text()"/>,
                        (<xsl:value-of select="$scribe/affiliation/text()"/>)-->
                </span>
            </span>
        </span>
    </xsl:template>    
    
    <!-- 4. EDITORISCHE EINGRIFFE -->

    <xsl:template match="note[@type='editorial-comment mirador']">
        <!--<xsl:variable name="glossContent" select="gloss"/>
        <xsl:variable name="descContent" select="desc"/>
        
        <span class="tei_note-editorial-comment-mirador-icon" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="{                if ($glossContent and $descContent) then                    concat($glossContent, ': ', $descContent)                else if ($glossContent) then                    $glossContent                else if ($descContent) then                    $descContent                else                    .            }">
            <i class="fa-solid fa-circle-info"/>
        </span>-->
        
        <span class="tei_note-editorial-comment-mirador-icon" data-bs-toggle="tooltip" data-bs-html="true">
            <xsl:attribute name="data-bs-title">
                <xsl:text disable-output-escaping="yes">&lt;span lang='de'&gt;</xsl:text>
                <xsl:value-of select="seg[@xml:lang='de']"/>
                <xsl:text disable-output-escaping="yes">&lt;/span&gt;</xsl:text>
                <xsl:text disable-output-escaping="yes">&lt;span lang='en'&gt;</xsl:text>
                <xsl:value-of select="seg[@xml:lang='en']"/>
                <xsl:text disable-output-escaping="yes">&lt;/span&gt;</xsl:text>
            </xsl:attribute>
            <i class="fa-solid fa-circle-info"/>
        </span>
    </xsl:template>

<xsl:template match="gloss">
    <xsl:value-of select="."/><!-- Get the content of gloss -->
</xsl:template>

<xsl:template match="desc">
    <xsl:value-of select="."/><!-- Get the content of desc -->
</xsl:template>

<xsl:template match="note[@type='editorial-comment']">
    <!--<span class="tei_note-editorial-comment-icon" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="{.}">
        <i class="fa-solid fa-circle-info"/>
    </span>-->
    <span class="tei_note-editorial-comment-icon" data-bs-toggle="tooltip" data-bs-html="true">
        <xsl:attribute name="data-bs-title">
            <xsl:text disable-output-escaping="yes">&lt;span lang='de'&gt;</xsl:text>
            <xsl:value-of select="seg[@xml:lang='de']"/>
            <xsl:text disable-output-escaping="yes">&lt;/span&gt;</xsl:text>
            <xsl:text disable-output-escaping="yes">&lt;span lang='en'&gt;</xsl:text>
            <xsl:value-of select="seg[@xml:lang='en']"/>
            <xsl:text disable-output-escaping="yes">&lt;/span&gt;</xsl:text>
        </xsl:attribute>
        <i class="fa-solid fa-circle-info"/>
    </span>
</xsl:template>
    
    <xsl:template match="note[@type='editorial-question']">
        <span class="tei_note-editorial-question-icon" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="{.}">
             <i class="fa-solid fa-circle-question"/>
        </span>
    </xsl:template>
    
    
    <!-- 5. POSTPROCESSING -->
    <!-- 5.1 Allgemeine Leerzeichen normalisieren -->
    <xsl:template match="text()">
        <xsl:analyze-string select="." regex="\s+">
            <xsl:matching-substring>
                <xsl:text> </xsl:text>
            </xsl:matching-substring>
            <xsl:non-matching-substring>
                <xsl:value-of select="."/>
            </xsl:non-matching-substring>
        </xsl:analyze-string>
    </xsl:template>
    
    <!-- 5.2 Von oxygen eingefügte Leerzeichenketten in choice entfernen -->
    <xsl:template match="choice/text()"/>
    
    <!-- 5.2 Von oxygen eingefügte Leerzeichenketten in choice entfernen -->
    <xsl:template match="subst/text()"/>
    
    <!-- 5.3 Von oxygen eingefügte Leerzeichenketten in div entfernen -->
    <xsl:template match="div/text()"/>
    
    <!-- 5.4 Von oxygen eingefügte Leerzeichenketten in Liste entfernen -->
    <xsl:template match="list/text()"/>
    
    
    
    <!-- Table: Tree of consanguinity -->
  <!--<xsl:template match="tei:table">
          
      <table class="table table-bordered table-sm table-tree-of-consanguinity">
          <tbody>
            <xsl:apply-templates select="row"/>
          </tbody>
      </table>
      
      
      <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>
        <xsl:variable name="book-n" select="//tei:div[@type='book']/@n"/>
      
      <button type="button" class="btn btn-primary btn-sm button-show-tree" data-bs-toggle="modal" data-bs-target="#tree-of-consanguinity-{$ms-id}-{$book-n}">
          <span lang="de">Element größer anzeigen</span><span lang="en">Display element larger</span>
    </button>
      <br class="tei_lb"/>
      <div class="modal fade" id="tree-of-consanguinity-{$ms-id}-{$book-n}" tabindex="-1" aria-labelledby="tree-of-consanguinityLabel" aria-hidden="true">
   <div class="modal-dialog modal-fullscreen">
     <div class="modal-content">
       <div class="modal-header">
         <h1 class="modal-title fs-5" id="tree-of-consanguinityLabel"><span lang="de">Arbor sanguinitates</span><span lang="en">Arbor sanguinitates</span></h1>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
       </div>
       <div class="modal-body">
            <table class="table table-bordered table-sm modal-table-tree-of-consanguinity">
              <tbody>
                <xsl:apply-templates select="row"/>
              </tbody>
            </table>
         </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span lang="de">Schließen</span><span lang="en">Close</span></button>
       </div>
     </div>
   </div>
 </div>
  </xsl:template>-->
    

<!-- Table: Tree of consanguinity -->
<xsl:template match="tei:table">
  <!-- Detect preceding handShift -->
  <xsl:variable name="new-hand" select="(preceding-sibling::tei:handShift[@new][1]/@new)"/>

  <!--  scribe id if present -->
  <xsl:variable name="hand-id" select="substring-after($new-hand, '#')"/>
  <xsl:variable name="scribe-ref" select="//tei:handNote[@xml:id=$hand-id]/@scribeRef"/>
  <xsl:variable name="scribe-id" select="replace($scribe-ref, '../../register/scribes.xml#', '')"/>

  <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>
  <xsl:variable name="book-n" select="//tei:div[@type='book']/@n"/>

  <!-- Wrap only the table pair (main + modal) in the scribe color -->
  <xsl:choose>
    <xsl:when test="$new-hand">
      <div class="ms_scribe-{$scribe-id}">
        <!-- main table -->
        <table class="table table-bordered table-sm table-tree-of-consanguinity">
          <tbody>
            <xsl:apply-templates select="row"/>
          </tbody>
        </table>

        <!-- modal window -->
        <div class="modal fade" id="tree-of-consanguinity-{$ms-id}-{$book-n}" tabindex="-1" aria-labelledby="tree-of-consanguinityLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="tree-of-consanguinityLabel">
                  <span lang="de">Arbor sanguinitates</span>
                  <span lang="en">Arbor sanguinitates</span>
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
              </div>
              <div class="modal-body">
                <table class="table table-bordered table-sm modal-table-tree-of-consanguinity">
                  <tbody>
                    <xsl:apply-templates select="row"/>
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  <span lang="de">Schließen</span>
                  <span lang="en">Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </xsl:when>

    <!-- Default (no preceding handShift) -->
    <xsl:otherwise>
      <div>
        <table class="table table-bordered table-sm table-tree-of-consanguinity">
          <tbody>
            <xsl:apply-templates select="row"/>
          </tbody>
        </table>

        <div class="modal fade" id="tree-of-consanguinity-{$ms-id}-{$book-n}" tabindex="-1" aria-labelledby="tree-of-consanguinityLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="tree-of-consanguinityLabel">
                  <span lang="de">Arbor sanguinitates</span>
                  <span lang="en">Arbor sanguinitates</span>
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
              </div>
              <div class="modal-body">
                <table class="table table-bordered table-sm modal-table-tree-of-consanguinity">
                  <tbody>
                    <xsl:apply-templates select="row"/>
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  <span lang="de">Schließen</span>
                  <span lang="en">Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </xsl:otherwise>
  </xsl:choose>

  <!--  button no bg colored -->
  <button type="button" class="btn btn-primary btn-sm button-show-tree" data-bs-toggle="modal" data-bs-target="#tree-of-consanguinity-{$ms-id}-{$book-n}">
    <span lang="de">Element größer anzeigen</span>
    <span lang="en">Display element larger</span>
  </button>
  <br class="tei_lb"/>
</xsl:template>



    


  <xsl:template match="row">
    <tr n="{@n}" id="{@xml:id}" data-corresp="{@corresp}">
      <xsl:apply-templates select="cell"/>
    </tr>
  </xsl:template>

  <xsl:template match="cell">
    <td>
      <xsl:if test="@n">
        <xsl:attribute name="n">
          <xsl:value-of select="@n"/>
        </xsl:attribute>
      </xsl:if>
        
      <xsl:if test="@xml:id">
        <xsl:attribute name="id">
          <xsl:value-of select="@xml:id"/>
        </xsl:attribute>
      </xsl:if>
        
        <xsl:if test="@role">
        <xsl:attribute name="class">
          <xsl:value-of select="@role"/>
        </xsl:attribute>
      </xsl:if>
        
        <xsl:if test="@ana='no-display'">
        <xsl:attribute name="class">
          <xsl:value-of select="@ana"/>
        </xsl:attribute>
      </xsl:if>

      <xsl:if test="@corresp">
        <xsl:attribute name="data-corresp">
          <xsl:value-of select="@corresp"/>
        </xsl:attribute>
      </xsl:if>
        
      <xsl:apply-templates/>
    </td>
  </xsl:template>
    

    
    <xsl:template match="ab">
        <span class="tei_ab">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
        
</xsl:stylesheet>