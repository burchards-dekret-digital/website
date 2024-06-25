<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:saxon="http://saxon.sf.net" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:local="http://www.w3.org/2005/xquery-local-functions" version="2.0" xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs local">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>

    <xsl:template match="TEI">
        <xsl:apply-templates select="text/body/*"/>
    </xsl:template>


    <xsl:template match="lb">
        <br class="tei_lb"/>
    </xsl:template>
 
    <xsl:template match="lb[@break='no']">
        <br class="tei_lb nobreak"/>
    </xsl:template>

    <xsl:template match="//div">
        <div class="tei_{@type}" id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-{@type}-{@n}">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="//div[@type='toc']">
        <div class="tei_{@type}" id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-chapter-0" data-canvas="{preceding::pb[1]/@corresp}">
            <button class="icon-chapter-mirador"><i class="fa-solid fa-eye"/></button>
            <!--<a class="synch-context-menu" id="{//div[@type='book']/@n}-chapter-0" onmouseover="contextMenuChapter(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><title/><g data-name="menu " id="menu_"><path d="M29,6H3A1,1,0,0,0,3,8H29a1,1,0,0,0,0-2Z"/><path d="M3,17H16a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/><path d="M25,24H3a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z"/></g></svg></a>
            <a onclick="synchWitnessesUpDown(this,'down')"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-bottom"><line class="cls-1" x1="16.08" x2="15.82" y1="29" y2="3"/><line class="cls-1" x1="16.08" x2="11.04" y1="29" y2="25.05"/><line class="cls-1" x1="16.08" x2="21.04" y1="29" y2="24.95"/></g></svg></a>-->
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="//div[@type='chapter']">    
    <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../register/scribes.xml#','')"/>    
        <div class="tei_{@type} ms_scribe-{$scribe-id}" id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-{@type}-{@n}" data-canvas="{preceding::pb[1]/@corresp}#xywh={preceding::lb[1]/@facs}">
            <!--<a class="synch-context-menu" id="{//div[@type='book']/@n}-{@type}-{@n}" onmouseover="contextMenuChapter(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><title/><g data-name="menu " id="menu_"><path d="M29,6H3A1,1,0,0,0,3,8H29a1,1,0,0,0,0-2Z"/><path d="M3,17H16a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/><path d="M25,24H3a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z"/></g></svg></a>
            <a onclick="synchWitnessesUpDown(this,'down')"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-bottom"><line class="cls-1" x1="16.08" x2="15.82" y1="29" y2="3"/><line class="cls-1" x1="16.08" x2="11.04" y1="29" y2="25.05"/><line class="cls-1" x1="16.08" x2="21.04" y1="29" y2="24.95"/></g></svg></a>
            <a onclick="synchWitnessesUpDown(this,'up')"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-top"><line class="cls-1" x1="15.87" x2="16.13" y1="3" y2="29"/><line class="cls-1" x1="15.87" x2="20.91" y1="3" y2="6.95"/><line class="cls-1" x1="15.87" x2="10.91" y1="3" y2="7.05"/></g></svg></a>-->
            <xsl:apply-templates/>
        </div>
    </xsl:template>
        
    
    <xsl:template match="//div[@type='chapter'][@rend='written-on-erased']">
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../register/scribes.xml#','')"/>    
        <div class="tei_{@type} ms_scribe-{$scribe-id}" id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-{@type}-{@n}" data-canvas="{preceding::pb[1]/@corresp}#xywh={preceding::lb[1]/@facs}">
            <!--<a class="synch-context-menu" id="{//div[@type='book']/@n}-{@type}-{@n}" onmouseover="contextMenuChapter(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><title/><g data-name="menu " id="menu_"><path d="M29,6H3A1,1,0,0,0,3,8H29a1,1,0,0,0,0-2Z"/><path d="M3,17H16a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/><path d="M25,24H3a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z"/></g></svg></a>
            <a onclick="synchWitnessesUpDown(this,'down')"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-bottom"><line class="cls-1" x1="16.08" x2="15.82" y1="29" y2="3"/><line class="cls-1" x1="16.08" x2="11.04" y1="29" y2="25.05"/><line class="cls-1" x1="16.08" x2="21.04" y1="29" y2="24.95"/></g></svg></a>
            <a onclick="synchWitnessesUpDown(this,'up')"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-top"><line class="cls-1" x1="15.87" x2="16.13" y1="3" y2="29"/><line class="cls-1" x1="15.87" x2="20.91" y1="3" y2="6.95"/><line class="cls-1" x1="15.87" x2="10.91" y1="3" y2="7.05"/></g></svg></a>-->
            <ins class="tei_delSpan-written-on-erased">
            <xsl:apply-templates/>
            </ins>
        </div>
    </xsl:template>
   
    <xsl:template match="//div[@type='chapter'][@rend='strikethrough']">
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../register/scribes.xml#','')"/>    
        <div class="tei_{@type} ms_scribe-{$scribe-id}" id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-{@type}-{@n}" data-canvas="{preceding::pb[1]/@corresp}#xywh={preceding::lb[1]/@facs}">
            <!--<a class="synch-context-menu" id="{//div[@type='book']/@n}-{@type}-{@n}" onmouseover="contextMenuChapter(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><title/><g data-name="menu " id="menu_"><path d="M29,6H3A1,1,0,0,0,3,8H29a1,1,0,0,0,0-2Z"/><path d="M3,17H16a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/><path d="M25,24H3a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z"/></g></svg></a>
            <a onclick="synchWitnessesUpDown(this,'down')"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-bottom"><line class="cls-1" x1="16.08" x2="15.82" y1="29" y2="3"/><line class="cls-1" x1="16.08" x2="11.04" y1="29" y2="25.05"/><line class="cls-1" x1="16.08" x2="21.04" y1="29" y2="24.95"/></g></svg></a>
            <a onclick="synchWitnessesUpDown(this,'up')"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-top"><line class="cls-1" x1="15.87" x2="16.13" y1="3" y2="29"/><line class="cls-1" x1="15.87" x2="20.91" y1="3" y2="6.95"/><line class="cls-1" x1="15.87" x2="10.91" y1="3" y2="7.05"/></g></svg></a>-->
            <ins class="tei_delSpan-strikethrough">
                <xsl:apply-templates/>
            </ins>
        </div>
    </xsl:template>
    
    <xsl:template match="//div[@type='praefatiuncula']">    
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../register/scribes.xml#','')"/>    
        <div class="tei_{@type} ms_scribe-{$scribe-id}" id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-{@type}-{@n}">

                <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//p">
        <div class="tei_{@type}">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//head[not(@type='chapter-title')]">
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../register/scribes.xml#','')"/>    
            <h6 class="tei_{@type} ms_scribe-{$scribe-id}">
                <xsl:apply-templates/>
            </h6>
    </xsl:template>
    
    <xsl:template match="//head[@type='chapter-title']">
        <button class="icon-chapter-mirador"><i class="fa-solid fa-eye"/></button>
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
        <xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../register/scribes.xml#','')"/>
            <li id="{//msIdentifier/@xml:id}-{//div[@type='book']/@n}-toc-{@n}" class="ms_scribe-{$scribe-id}" onclick="linkTocToChapter(this)" onmouseover="changeCursorToHand(this)">
                <xsl:apply-templates/>
            </li>
    </xsl:template>
    
    <xsl:template match="note[@type='inscription']">
        <span class="tei_note-inscription">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="note[@type='contemporary-marginalia']">
        <span class="tei_note-contemporary-marginalia">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="note[@type='later-marginalia']">
        <span class="tei_note-later-marginalia">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="note[@type='contemporary-interlinear']">
        <span class="tei_note-contemporary-interlinear">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="note[@type='later-interlinear']">
        <span class="tei_note-later-interlinear">
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
    
    <xsl:template match="fw">
        <span class="tei_fw">
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
        <span class="tei_add">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="//damage//gap[@reason='cut-out']">
        <span class="tei_damage-cut-out">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="//damage//gap[@reason='torn-out']">
        <span class="tei_damage-torn-out">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="//damage//gap[@reason='burned']">
        <span class="tei_damage-burned">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="//damage//gap[@reason='trimmed']">
        <span class="tei_damage-trimmed">
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
        <span class="tei_del-expunctuation">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="//del[@rend='underlined']">
        <span class="tei_del-underlined">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <!-- 3.7 Rasuren ohne Ersetzung als Span mit Scherensymbol -->
    <xsl:template match="//del[@rend='erasure'][not(ancestor::subst)]">
        <span class="tei_erasure-without-substitution">__</span>
    </xsl:template>
    
    <!-- 3.8 Rasuren mit Ersetzung als Span (in der Praxis in Kombination mit 3.4)-->
    <xsl:template match="//subst">
        <span class="tei_subst">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="//del[@rend='erasure']/text()"/>
    
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
    
    <xsl:template match="//delSpan[@rend='written-on-erased']">
        <ins class="tei_delSpan-start-written-on-erased">
            <xsl:apply-templates/>
        </ins>
    </xsl:template>

    <xsl:template match="//delSpan[@rend='strikethrough']">
        <ins class="tei_delSpan-start-strikethrough">
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
    </xsl:template>

    <!-- Handshift -->
    <xsl:template match="//handShift">
        <!-- get data for hand Name --> 
        <xsl:variable name="hand-ref" select="./@new"/>
        <xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>
        
        <!-- get data for scribe Name -->
        <xsl:variable name="scribe-ref" select="//handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../register/scribes.xml#','')"/>
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
            <span class="tei_handShift-icon" onclick="openHandShiftInMirador('{$handSchift-iiif}','{@new}')"><!--✍--><img src="https://www.svgrepo.com/show/11315/hand-and-pen.svg" style="width: 4%"/></span>
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
    <!-- 4.1 Überführung der Kommentare als 'popover' on hover -->
    <xsl:template match="note[@type='editorial-comment']">
        <span class="tei_note-editorial-comment-wrapper">
            <span class="tei_note-editorial-comment-asterix">*</span>
            <span class="tei_note-editorial-comment">
                <xsl:apply-templates/>
            </span>
        </span>
    </xsl:template>
    
    <!-- 4.2 Überführung der Fragen als 'popover' on hover -->
    <xsl:template match="note[@type='editorial-question']">
        <span class="tei_note-editorial-question-wrapper">
            <span class="tei_note-editorial-question-asterix">
                <sup>?</sup>
            </span>
            <span class="tei_note-editorial-question">
                <xsl:apply-templates/>
            </span>
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
        
</xsl:stylesheet>