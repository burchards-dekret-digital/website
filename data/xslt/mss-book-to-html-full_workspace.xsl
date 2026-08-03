<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0" xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs tei">

    <xsl:output method="html" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>
    <!--<xsl:strip-space elements="*"/>-->

    <xsl:variable name="scribesDoc" select="doc('../register/scribes.xml')" as="document-node()"/>
    <xsl:variable name="literatureDoc" select="doc('../register/literature.xml')" as="document-node()"/>

    <xsl:key name="handNotesById" match="tei:handNote" use="@xml:id"/>
    <xsl:key name="personById" match="tei:person" use="@xml:id"/>
    <xsl:key name="biblById" match="tei:biblStruct" use="@xml:id"/>

    <xsl:template match="/">
        <article class="bdd-book">
            <section class="bdd-view transcription" data-view="transcription" id="teiTranscription">
               <xsl:apply-templates select="/tei:TEI" mode="transcription"/>
            </section>

            <xsl:if test="exists(//tei:div[@type = 'toc'] | //tei:div[@type = 'content'])">
                <section class="bdd-view structure" data-view="structure">
                    <xsl:apply-templates select="/" mode="structure"/>
                </section>
            </xsl:if>

            <xsl:if test="exists(//@hand) or exists(//tei:handShift[@new])">
                <section class="bdd-view scribe" data-view="scribe">
                    <xsl:apply-templates select="/" mode="scribe"/>
                </section>
            </xsl:if>

            <xsl:if test="exists(//tei:respStmt)">
                <section class="bdd-view info" data-view="info">
                    <xsl:apply-templates select="/" mode="info"/>
                </section>
            </xsl:if>
        </article>
    </xsl:template>

<!--TRANSCRIPTION (mode=transcription)-->

<xsl:template match="tei:TEI" mode="transcription">
        <xsl:apply-templates select="tei:text/tei:body/*" mode="transcription"/>
    </xsl:template>


    <xsl:template match="tei:lb" mode="transcription">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <br class="tei_lb {$taxonomy}"/>
    </xsl:template>
 
    <xsl:template match="tei:lb[@break='no']" mode="transcription">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <br class="tei_lb nobreak {$taxonomy}"/>
    </xsl:template>
    
    <xsl:template match="tei:lb[ancestor::tei:del]" mode="transcription">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <br class="tei_lb {$taxonomy}"/><span class="erased-lb">__</span>
    </xsl:template>

    <xsl:template match="tei:div" mode="transcription">
        <div class="tei_{@type}" id="{//tei:msIdentifier/@xml:id}-{//tei:div[@type='book']/@n}-{@type}-{@n}" data-canvas="{preceding::tei:pb[1]/@corresp}#xywh={preceding::tei:lb[1]/@facs}">
            <xsl:apply-templates mode="transcription"/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:div[@type='book']" mode="transcription">
        <div class="tei_{@type}" id="{//tei:msIdentifier/@xml:id}-{//tei:div[@type='book']/@n}-{@type}-{@n}">
            <xsl:apply-templates mode="transcription"/>
        </div>
    </xsl:template>
    
    
    <xsl:template match="tei:div[@type='toc']" mode="transcription">
        <div class="tei_{@type}" id="{@xml:id}" data-canvas="{preceding::tei:pb[1]/@corresp}">
            <xsl:apply-templates mode="transcription"/>
        </div>
    </xsl:template>
        
    <xsl:template match="tei:div[@type='chapter' or @type='interrogation' or @type='paratext']" mode="transcription">    
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!-- Split by whitespace and select the first id (token) -->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//tei:handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>    
        
        <!-- Process ana attribute -->
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        
        <!-- scorresp variable -->
        <!-- Extract corresp targets after # -->
            <xsl:variable name="corresp-chapters-ids" select="string-join(                 for $c in tokenize(@corresp, '\s+')                  return substring-after($c, '#'),                  ' '             )"/>

        <div class="tei_{@type} ms_scribe-{$scribe-id} {$taxonomy}" id="{@xml:id}" data-corresp="{$corresp-chapters-ids}" data-canvas="{preceding::tei:pb[1]/@corresp}#xywh={preceding::tei:lb[1]/@facs}">
           <xsl:apply-templates mode="transcription"/>
        </div>
    </xsl:template>
    
    
    <xsl:template match="tei:div[@type='praefatiuncula']" mode="transcription">    
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!--<xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>-->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//tei:handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>    
       
        <div class="tei_{@type} ms_scribe-{$scribe-id}" id="{@xml:id}">
                <xsl:apply-templates mode="transcription"/>
        </div>
        
    </xsl:template>
    
    <xsl:template match="tei:p" mode="transcription">
        <div class="tei_paragraph">
            <xsl:apply-templates mode="transcription"/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:head[not(@type='chapter-title')]" mode="transcription">
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!--<xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>-->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//tei:handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>    
            <h6 class="tei_{@type} ms_scribe-{$scribe-id}">
                <xsl:apply-templates mode="transcription"/>
            </h6>
    </xsl:template>
    
    
    <xsl:template match="tei:head[@type='chapter-title']" mode="transcription">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <h5 class="tei_{@type} {$taxonomy}">
            <xsl:apply-templates mode="transcription"/>
        </h5>
    </xsl:template>
    
    <!--first interrogation-->
    <xsl:template match="tei:div[@type='interrogation']//head[@type='chapter-title']" mode="transcription">
        <h5 class="tei_{@type}">
            <xsl:apply-templates mode="transcription"/>
        </h5>
    </xsl:template>
    
    <xsl:template match="tei:div[@type='interrogation']//label[@type='chapter-number']" mode="transcription">
        <h5 class="tei_{@type}">
            <xsl:apply-templates mode="transcription"/>
        </h5>
    </xsl:template>
       
    <xsl:template match="tei:list" mode="transcription">
        <ol>
            <xsl:apply-templates mode="transcription"/>
        </ol>
    </xsl:template>

    <xsl:template match="tei:item" mode="transcription">
        <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!--<xsl:variable name="hand-id" select="replace($hand-ref,'#','')"/>-->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//tei:handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/>
        
        <!--taxonomy-->
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
         
         <!-- sameAs variable: corresp chapter -->
        <xsl:variable name="corresp-chapter" select="replace(@sameAs, '#', '')"/>
            <li id="{@xml:id}" class="ms_scribe-{$scribe-id} {$taxonomy}" data-sameas="{$corresp-chapter}">        
                <xsl:apply-templates mode="transcription"/>
            </li>
    </xsl:template>


    <xsl:template match="tei:note[@type='inscription']" mode="transcription">
      <!-- get scribe -->
        <xsl:variable name="hand-ref" select="./@hand"/>
        <!-- Split by whitespace and select the first id (token) -->
        <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
        <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
        <xsl:variable name="scribe-ref" select="//tei:handNote[@xml:id=$hand-id]/@scribeRef"/>
        <xsl:variable name="scribe-id" select="replace($scribe-ref,'../../register/scribes.xml#','')"/> 

        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        
        <span class="tei_note-inscription ms_scribe-{$scribe-id} {$taxonomy}">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@type='contemporary-marginalia']" mode="transcription">
        <span class="tei_note-contemporary-marginalia">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@type='later-marginalia']" mode="transcription">
        <span class="tei_note-later-marginalia">    
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@type='contemporary-interlinear']" mode="transcription">
        <span class="tei_note-contemporary-interlinear">    
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@type='later-interlinear']" mode="transcription">
        <span class="tei_note-later-interlinear">    
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:pb" mode="transcription">
        <span class="tei_pb"><xsl:apply-templates select="@n|node()" mode="transcription"/>a</span>
    </xsl:template>

    
    <xsl:template match="tei:cb[@n='b']" mode="transcription">
        <span class="tei_cb">
            <xsl:apply-templates select="preceding::tei:pb[1]/@n|node()" mode="transcription"/>b</span>
    </xsl:template>
    
    <xsl:template match="tei:fw[@type='page-header' ]" mode="transcription">
        <span class="tei_fw-page-header">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:fw[@type='quire-numeral' ]" mode="transcription">
        <span class="tei_fw-quire-numeral">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
   
    <!-- 3.1 Rote Initialen -->
    <xsl:template match="tei:hi[@rend='color:red initial']" mode="transcription">
        <span class="tei_hi-color-red-initial">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <!-- 3.2 Rubrizierung -->
    <xsl:template match="tei:hi[@rend='color:red']" mode="transcription">
        <span class="tei_hi-color-red">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='versal']" mode="transcription">
        <span class="tei_hi-versal">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='color-stroked']" mode="transcription">
        <span class="tei_hi-color-stroked">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:abbr" mode="transcription">
        <span class="tei_abbr" style="display:none">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>

    <xsl:template match="tei:expan" mode="transcription">
        <span class="tei_expan">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:seg[@type='pos-of-displaced']" mode="transcription">
        <span class="tei_seg_displaced" id="{replace(replace(@corresp,'supp','sod'),'#','')}">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
   
    <xsl:template match="tei:supplied" mode="transcription">
        <span class="tei_supplied" id="{@xml:id}">[<xsl:apply-templates mode="transcription"/>]</span>
    </xsl:template>
    
    <xsl:template match="tei:add" mode="transcription">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <span class="tei_add {$taxonomy}">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
       
    <xsl:template match="tei:damage//gap[@reason='cut-out']" mode="transcription">
        <span class="tei_damage-cut-out"> 
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    <xsl:template match="tei:damage//gap[@reason='torn-out']" mode="transcription">
        <span class="tei_damage-torn-out">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    <xsl:template match="tei:damage//gap[@reason='burned']" mode="transcription">
        <span class="tei_damage-burned"> 
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    <xsl:template match="tei:damage//gap[@reason='trimmed']" mode="transcription">
        <span class="tei_damage-trimmed">   
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:del[@rend='strikethrough']" mode="transcription">
        <span class="tei_del-strikethrough">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:del[@rend='blackout']" mode="transcription">
        <span class="tei_del-blackout">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:del[@rend='expunctuation']" mode="transcription">
        <span class="tei_del-expunctuation">    
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:del[@rend='correction']" mode="transcription">
        <span class="tei_del-correction">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:del[@rend='underlined']" mode="transcription">
        <span class="tei_del-underlined">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    
    <!-- 3.7 Rasuren ohne Ersetzung als Span mit Scherensymbol -->
    <xsl:template match="tei:del[@rend='erasure'][not(ancestor::subst) and not(child::lb)]" mode="transcription">
        <!-- Process ana attribute -->
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        
        <span class="tei_erasure-without-substitution {$taxonomy}">__</span>
    </xsl:template>
    
    <!-- 3.8 Rasuren mit Ersetzung als Span (in der Praxis in Kombination mit 3.4)-->
    <xsl:template match="tei:subst" mode="transcription">
        <span class="tei_subst">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    
    <xsl:template match="tei:del[@rend='erasure'][node()][not(child::lb)]" mode="transcription">
        <span class="tei_erasure-visible">    
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    
    <xsl:template match="tei:g" mode="transcription">
        <span class="tei_g">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:sic" mode="transcription">
        <span class="tei_sic">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:measure[@type='duration-of-penance']" mode="transcription">
        <span class="tei_measure" type="{@type}" quantity="{@quantity}" unit="{@unit}">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:measure[@type='fine']" mode="transcription">
       <span class="tei_measure" type="{@type}" quantity="{@quantity}" unit="{@unit}">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:num" mode="transcription">
        <span class="tei_num" data-value="{@value}"><xsl:apply-templates mode="transcription"/></span>
    </xsl:template>
    
    <xsl:template match="tei:unclear" mode="transcription">
        <span class="tei_unclear" cert="{@cert}">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>
    
     
    <xsl:template match="tei:delSpan" mode="transcription">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <span class="tei_delSpan {@rend} {$taxonomy}" delSpan_target="{substring-after(@spanTo, '#')}"/>
            
    </xsl:template>
    
    <xsl:template match="tei:addSpan" mode="transcription">
        <xsl:variable name="ana-values" select="tokenize(@ana, ' ')"/>
        <xsl:variable name="taxonomy" select="string-join(for $ana in $ana-values return substring-after($ana, '#'), ' ')"/>
        <span class="tei_addSpan {$taxonomy}" addSpan_target="{substring-after(@spanTo, '#')}"/>
                
    </xsl:template>
    
    <xsl:template match="tei:anchor" mode="transcription">
        <span class="tei_anchor" id="{@xml:id}"/>
    </xsl:template>
    
    
    <!-- HandShift: resolve hand and scribe information; JavaScript creates the visual hover icon -->
<xsl:template match="tei:handShift" mode="transcription">
    <xsl:variable name="hand-ref" select="@new"/>
    <xsl:variable name="first-hand-id" select="tokenize($hand-ref, '\s+')[1]"/>
    <xsl:variable name="hand-id" select="replace($first-hand-id, '#', '')"/>
    <xsl:variable name="scribe-ref" select="//tei:handNote[@xml:id=$hand-id]/@scribeRef"/>
    <xsl:variable name="scribe-id" select="replace($scribe-ref, '../../register/scribes.xml#', '')"/>
    <xsl:variable name="scribe" select="$scribesDoc//tei:person[@xml:id=$scribe-id]"/>
    
    <span class="tei_handShift-wrapper ms_scribe-{$scribe-id}">
        <span class="tei_handShift-info"><xsl:value-of select="replace(//tei:handNote[@xml:id=$hand-id]/text(), '\.', '')"/><xsl:text>. </xsl:text><xsl:value-of select="$scribe/tei:name"/><xsl:text>, </xsl:text><xsl:value-of select="$scribe/tei:affiliation"/></span>
    </span>
</xsl:template>
    
    <!-- 4. EDITORISCHE EINGRIFFE -->
    <xsl:template match="tei:note[@type='editorial-comment mirador']" mode="transcription">
        <span class="tei_note-editorial-comment tei_note-editorial-comment-mirador">
            <span class="tei-popover-content" hidden="hidden">
                <span lang="de"><xsl:apply-templates select="tei:seg[@xml:lang='de']/node()" mode="editorial-popover"/></span>
                <span lang="en"><xsl:apply-templates select="tei:seg[@xml:lang='en']/node()" mode="editorial-popover"/></span>
            </span>
        </span>
    </xsl:template>


<xsl:template match="tei:gloss" mode="transcription">
    <xsl:value-of select="."/><!-- Get the content of gloss -->
</xsl:template>

<xsl:template match="tei:desc" mode="transcription">
    <xsl:value-of select="."/><!-- Get the content of desc -->
</xsl:template>

    
    <xsl:template match="tei:note[@type='editorial-comment']" mode="transcription">
    <span class="tei_note-editorial-comment">
        <span class="tei-popover-content" hidden="hidden">
            <span lang="de"><xsl:apply-templates select="tei:seg[@xml:lang='de']/node()" mode="editorial-popover"/></span>
            <span lang="en"><xsl:apply-templates select="tei:seg[@xml:lang='en']/node()" mode="editorial-popover"/></span>
        </span>
    </span>
</xsl:template>

    
    <xsl:template match="tei:note[@type='editorial-question']" mode="transcription">
        <span class="tei_note-editorial-question-icon" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="{.}">
             <i class="fa-solid fa-circle-question"/>
        </span>
    </xsl:template>
    
    
    <!-- Transform editorial comment content into real HTML for JavaScript popovers -->
<xsl:template match="text()" mode="editorial-popover"><xsl:value-of select="."/></xsl:template>
<xsl:template match="*" mode="editorial-popover"><xsl:apply-templates mode="editorial-popover"/></xsl:template>

<!-- bibl clickable link to bibliography page -->
   
    <!-- Resolve bibliography references and create real HTML links inside editorial popover content -->
<xsl:template match="tei:bibl[@copyOf]" mode="editorial-popover">
    <xsl:variable name="id" select="replace(@copyOf, '^#', '')"/>
    <xsl:variable name="entry" select="$literatureDoc//*[@xml:id = $id][1]"/>

    <xsl:variable name="surname">
        <xsl:choose>
            <xsl:when test="normalize-space((($entry/descendant::tei:analytic/tei:author//tei:surname)[1], ($entry/descendant::tei:monogr/tei:author//tei:surname)[1], ($entry/descendant::tei:author//tei:surname)[1])[1]) != ''"><xsl:value-of select="normalize-space((($entry/descendant::tei:analytic/tei:author//tei:surname)[1], ($entry/descendant::tei:monogr/tei:author//tei:surname)[1], ($entry/descendant::tei:author//tei:surname)[1])[1])"/></xsl:when>
            <xsl:when test="normalize-space((($entry/descendant::tei:analytic/tei:editor//tei:surname)[1], ($entry/descendant::tei:monogr/tei:editor//tei:surname)[1], ($entry/descendant::tei:editor//tei:surname)[1])[1]) != ''"><xsl:value-of select="normalize-space((($entry/descendant::tei:analytic/tei:editor//tei:surname)[1], ($entry/descendant::tei:monogr/tei:editor//tei:surname)[1], ($entry/descendant::tei:editor//tei:surname)[1])[1])"/></xsl:when>
            <xsl:when test="normalize-space((($entry/descendant::tei:analytic/tei:author/tei:name)[1], ($entry/descendant::tei:monogr/tei:author/tei:name)[1], ($entry/descendant::tei:author/tei:name)[1])[1]) != ''"><xsl:value-of select="normalize-space((($entry/descendant::tei:analytic/tei:author/tei:name)[1], ($entry/descendant::tei:monogr/tei:author/tei:name)[1], ($entry/descendant::tei:author/tei:name)[1])[1])"/></xsl:when>
        </xsl:choose>
    </xsl:variable>

    <xsl:variable name="year" select="normalize-space(($entry//tei:monogr/tei:imprint/tei:date[1])[1])"/>

    <a href="{concat('bibl.html#', $id)}" target="_blank" class="tei_bibl-ref"><xsl:value-of select="$surname"/><xsl:text> </xsl:text><xsl:value-of select="$year"/><xsl:text>, </xsl:text><xsl:apply-templates select="tei:citedRange" mode="editorial-popover"/></a>
</xsl:template>




    <xsl:template match="tei:citedRange" mode="editorial-popover">
    <xsl:variable name="lang" select="ancestor::tei:seg[@xml:lang][1]/@xml:lang"/>
    <xsl:choose>
        <xsl:when test="$lang = 'de'"><xsl:text>S. </xsl:text></xsl:when>
        <xsl:otherwise><xsl:text>pp. </xsl:text></xsl:otherwise>
    </xsl:choose>
    <xsl:value-of select="."/>
</xsl:template>

    
    
    <!-- 5. POSTPROCESSING -->
    <!-- 5.1 Allgemeine Leerzeichen normalisieren -->
    <xsl:template match="text()" mode="transcription">
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
    <xsl:template match="tei:choice/text()" mode="transcription"/>
    
    <!-- 5.2 Von oxygen eingefügte Leerzeichenketten in choice entfernen -->
    <xsl:template match="tei:subst/text()" mode="transcription"/>
    
    <!-- 5.3 Von oxygen eingefügte Leerzeichenketten in div entfernen -->
    <xsl:template match="tei:div/text()" mode="transcription"/>
    
    <!-- 5.4 Von oxygen eingefügte Leerzeichenketten in Liste entfernen -->
    <xsl:template match="tei:list/text()" mode="transcription"/>
    

<!-- Table: Tree of consanguinity -->
<xsl:template match="tei:table" mode="transcription">
    <!-- Detect preceding handShift -->
    <xsl:variable name="new-hand" select="preceding-sibling::tei:handShift[@new][1]/@new"/>

    <!-- Resolve scribe id if a preceding handShift exists -->
    <xsl:variable name="hand-id" select="substring-after($new-hand, '#')"/>

    <xsl:variable name="scribe-ref" select="//tei:handNote[@xml:id = $hand-id]/@scribeRef"/>

    <xsl:variable name="scribe-id" select="replace(             $scribe-ref,             '../../register/scribes.xml#',             ''         )"/>

    <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>

    <xsl:variable name="book-n" select="//tei:div[@type = 'book']/@n"/>

    <div class="tei-table-tree-source" data-ms-id="{$ms-id}" data-book-n="{$book-n}">
        <xsl:if test="$new-hand">
            <xsl:attribute name="class">
                <xsl:text>tei-table-tree-source ms_scribe-</xsl:text>
                <xsl:value-of select="$scribe-id"/>
            </xsl:attribute>
        </xsl:if>

        <table class="table table-bordered table-sm table-tree-of-consanguinity">
            <tbody>
                <xsl:apply-templates select="tei:row" mode="transcription"/>
            </tbody>
        </table>
    </div>

    <br class="tei_lb"/>
</xsl:template>

  <xsl:template match="tei:row" mode="transcription">
    <tr n="{@n}" id="{@xml:id}" data-corresp="{@corresp}">
      <xsl:apply-templates select="tei:cell" mode="transcription"/>
    </tr>
  </xsl:template>

  <xsl:template match="tei:cell" mode="transcription">
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
        
      <xsl:apply-templates mode="transcription"/>
    </td>
  </xsl:template>
    

    
    <xsl:template match="tei:ab" mode="transcription">
        <span class="tei_ab">
            <xsl:apply-templates mode="transcription"/>
        </span>
    </xsl:template>



<!-- STRUCTURE (mode=structure)-->

<!-- Strip spaces from all elements -->
<!-- Load the scribes.xml document -->
<xsl:template match="/" mode="structure">
    <div id="teiStructure" class="structure">
        <xsl:apply-templates select="//tei:div[@type = 'toc']" mode="structure"/>
        <xsl:apply-templates select="//tei:div[@type = 'content']" mode="structure"/>
    </div>
</xsl:template>

    <!-- Exlcude fw, editorial comment, paratext, interrogation -->
    <xsl:template match="tei:fw" mode="structure"/>
    <xsl:template match="tei:note[@type = 'editorial-comment']" mode="structure"/>
    <xsl:template match="tei:div[@type = 'paratext']" mode="structure"/>
    <xsl:template match="tei:div[@type = 'interrogation' and tei:head//tei:label//tei:num]" mode="structure"/>


    
<xsl:template match="tei:div[@type = 'toc']" mode="structure">
    <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>
    <xsl:variable name="book-n" select="//tei:div[@type='book']/@n"/>
    <div class="tei-structure-source" data-structure-type="toc" data-ms-id="{$ms-id}" data-book-n="{$book-n}">
        <table class="table table-hover">
            <tbody>
                <xsl:apply-templates mode="structure"/>
            </tbody>
        </table>
    </div>
</xsl:template>
    

    <!-- exclude header text -->
    <xsl:template match="tei:div[@type = 'toc']/tei:head" mode="structure"/>


    <!-- Key for looking up handNote by @xml:id -->
<!-- Key for looking up person by @xml:id in scribes.xml -->
<xsl:template match="tei:item" mode="structure">
        <xsl:variable name="filtered-text">
            <xsl:apply-templates select="node()[not(self::tei:label) and not(self::tei:pc)]" mode="structure"/>
        </xsl:variable>
        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words" select="tokenize(normalize-space($filtered-text), '\s+')"/>
        <!-- andere files abfragen -->
        <xsl:variable name="documents" select="tokenize(@corresp, ' ')"/>

        <tr>
            <!--<td>Kap. <xsl:value-of select=".//tei:label//tei:num"/> (<xsl:value-of select=".//tei:label//tei:num/@value"/>)</td>-->
            <!--<td><a href="#{@xml:id}" data-chapter-id="{@xml:id}" onclick="linkStructureToChapter(this); return false;">Kap. <xsl:value-of select=".//tei:label//tei:num"/> (<xsl:value-of select=".//tei:label//tei:num/@value"/>)</a></td>-->
            <td>
                <a href="#{@xml:id}" data-chapter-id="{@xml:id}" onclick="linkStructureToChapter(this); return false;">
                <xsl:text>Kap. </xsl:text>
                
                <span class="structure-clickable-number">
                    <xsl:apply-templates select=".//tei:label//tei:num" mode="transcription"/>
                </span>
                
                <xsl:text> (</xsl:text>
                <xsl:value-of select=".//tei:label//tei:num/@value"/>
                <xsl:text>)</xsl:text></a>
            </td>
            <td>
                <xsl:value-of select="./@n"/>
            </td>
            <td>
                <xsl:for-each select="$documents">
                  <xsl:variable name="documentPathOrig" select="substring-before(., '#')"/>
                  <xsl:variable name="elementId" select="substring-after(., '#')"/>
              
                  <!-- CASE 1: full path provided -->
                  <xsl:choose>
                    <xsl:when test="contains(., '.xml#')">
                      <!--<xsl:variable name="documentPath" select="replace($documentPathOrig, '\.\./', '../mss/')"/>-->
                        
                        <xsl:variable name="documentPath" select="replace($documentPathOrig, '^(\.\./|\./)', '../mss/')"/>
                      <xsl:variable name="doc" select="doc($documentPath)"/>
                      <xsl:variable name="root" select="$doc"/>
                      <xsl:value-of select="$root//tei:msName[@type = 'sigle']"/>,
                      Kap. <xsl:value-of select="($root//*[@xml:id = $elementId]//tei:num)[1]"/> (N.
                      <xsl:value-of select="$root//*[@xml:id = $elementId]/@n"/>)
                    </xsl:when>
              
                    <!-- CASE 2: only #id given -->
                    <xsl:otherwise>
                      <xsl:variable name="id" select="$elementId"/>
                      <xsl:variable name="prefix">
                        <xsl:choose>
                          <xsl:when test="starts-with($id,'frankfurt-ub-b-50')">frankfurt-ub-b-50</xsl:when>
                          <xsl:when test="starts-with($id,'koeln-edd-c-')">koeln-edd-c-119</xsl:when>
                          <xsl:when test="starts-with($id,'vatican-bav-pal-lat-586')">vatican-bav-pal-lat-586</xsl:when>
                          <xsl:otherwise>bamberg-sb-c-6</xsl:otherwise>
                        </xsl:choose>
                      </xsl:variable>
              
                      <!-- extract book number from ID -->
                      <xsl:variable name="booknum" select="replace($id, '.*-(\d+)-.*', '$1')"/>
                      <xsl:variable name="documentPath" select="concat('../mss/', $prefix, '/', $prefix, '-', $booknum, '.xml')"/>
                      <xsl:variable name="doc" select="doc($documentPath)"/>
                      <xsl:variable name="root" select="$doc"/>
                      <xsl:value-of select="$root//tei:msName[@type = 'sigle']"/>,
                      Kap. <xsl:value-of select="($root//*[@xml:id = $elementId]//tei:num)[1]"/> (N.
                      <xsl:value-of select="$root//*[@xml:id = $elementId]/@n"/>)
                    </xsl:otherwise>
                  </xsl:choose>
              
                  <!-- separator -->
                  <xsl:if test="position() &lt; last()"> / </xsl:if>
                </xsl:for-each>
              </td>
            

            <td>
                <!-- Output the first three words --> <xsl:for-each select="$words[position() le 3]"> <xsl:if test="position() != 1"> <xsl:text> </xsl:text> </xsl:if> <xsl:value-of select="."/> </xsl:for-each>... </td>
            <td>
                <!-- Step 1: Get all hand IDs as strings -->
                <xsl:variable name="handIds" select="tokenize(@hand, '\s+')"/>

                <!-- Step 2: Select the corresponding <tei:handNote> elements directly -->
                <xsl:for-each select="                         for $id in $handIds                         return                             key('handNotesById', substring-after($id, '#'))">

                    <!-- Display hand note content -->
                    <xsl:apply-templates select="node() except tei:note"/>
                    <xsl:text> </xsl:text>

                    <!-- Get scribe -->
                    <xsl:if test="@scribeRef">
                        <xsl:variable name="scribeId" select="substring-after(@scribeRef, '#')"/>
                        <xsl:variable name="scribe" select="key('personById', $scribeId, $scribesDoc)"/>
                        <xsl:if test="$scribe">
                            <xsl:value-of select="$scribe/tei:name"/>
                            <xsl:text>, </xsl:text>
                            <xsl:value-of select="$scribe/tei:affiliation"/>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </td>
        </tr>
    </xsl:template>

    <!-- Do nothing for 'teiHeader', effectively excluding it from output -->
    
<xsl:template match="tei:div[@type = 'content']" mode="structure">
    <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>
    <xsl:variable name="book-n" select="//tei:div[@type='book']/@n"/>
    <div class="tei-structure-source" data-structure-type="content" data-ms-id="{$ms-id}" data-book-n="{$book-n}">
        <table class="table table-hover">
            <tbody>
                <xsl:apply-templates mode="structure"/>
            </tbody>
        </table>
    </div>
</xsl:template>

    <!-- exclude abbr -->
    <xsl:template match="tei:abbr" mode="structure"/>
    <xsl:template match="tei:div[@type = 'interrogation' and tei:head//tei:label//tei:num]" mode="structure"/>

    <!-- Key for looking up handNote by @xml:id-->
<!-- Key for looking up scribe by @xml:id in scribes.xml -->
<xsl:template match="tei:div[@type = 'chapter']" mode="structure">
        <!-- andere files abfragen -->
        <xsl:variable name="documents" select="tokenize(@corresp, ' ')"/>

        <xsl:variable name="filtered-text-incipit">
            <xsl:apply-templates select="./tei:p[not(self::tei:head/tei:label) and not(self::tei:pc) and not(self::tei:choice/tei:abbr)]" mode="structure"/>
        </xsl:variable>
        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words-incipit" select="tokenize(normalize-space($filtered-text-incipit), '\s+')"/>

        <xsl:variable name="filtered-text-head">
            <xsl:apply-templates select="./tei:head[not(self::tei:label) and not(self::tei:pc)]" mode="structure"/>
        </xsl:variable>
        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words-head" select="tokenize(normalize-space($filtered-text-head), '\s+')"/>

        <xsl:variable name="filtered-text-inscription">
            <xsl:apply-templates select="./tei:note[@type = 'inscription'][not(self::tei:label) and not(self::tei:pc)]" mode="structure"/>
        </xsl:variable>
        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words-inscription" select="tokenize(normalize-space($filtered-text-inscription), '\s+')"/>

        <!--<xsl:variable name="chapterLabel"> Kap. <xsl:value-of select="./tei:head//tei:label//tei:num"/> (<xsl:value-of select="./tei:head//tei:label//tei:num/@value"/>) </xsl:variable>-->
        <xsl:variable name="chapterLabel">
            <xsl:text>Kap. </xsl:text>
            
            <span class="structure-clickable-number">
                <xsl:apply-templates select="./tei:head//tei:label//tei:num" mode="transcription"/>
            </span>
            
            <xsl:text> (</xsl:text>
            <xsl:value-of select="./tei:head//tei:label//tei:num/@value"/>
            <xsl:text>)</xsl:text>
        </xsl:variable>

        <tr>
            <td>
                <!--<xsl:value-of select="$chapterLabel"/>-->
                <!--<a href="#{@xml:id}" data-chapter-id="{@xml:id}" onclick="linkStructureToChapter(this); return false;">
                     <xsl:value-of select="$chapterLabel"/>
                 </a>-->
                <a href="#{@xml:id}" data-chapter-id="{@xml:id}" onclick="linkStructureToChapter(this); return false;">
                    <xsl:sequence select="$chapterLabel"/>
                </a>
            </td>
            <td>
                <xsl:value-of select="./@n"/>
            </td>
            <td>
                <xsl:for-each select="$documents">
                  <!-- split into path and element ID -->
                  <xsl:variable name="documentPathOrig" select="substring-before(., '#')"/>
                  <xsl:variable name="elementId" select="substring-after(., '#')"/>
              
                  <!-- CASE 1: full path provided -->
                  <xsl:choose>
                    <xsl:when test="contains(., '.xml#')">
                      <!--<xsl:variable name="documentPath" select="replace($documentPathOrig, '\.\./', '../mss/')"/>-->
                      <xsl:variable name="documentPath" select="replace($documentPathOrig, '^(\.\./|\./)', '../mss/')"/>
                      <xsl:variable name="doc" select="doc($documentPath)"/>
                      <xsl:variable name="root" select="$doc"/>
                      <xsl:value-of select="$root//tei:msName[@type = 'sigle']"/>,
                      Kap. <xsl:value-of select="($root//*[@xml:id = $elementId]//tei:num)[1]"/> (N.
                      <xsl:value-of select="$root//*[@xml:id = $elementId]/@n"/>)
                    </xsl:when>
              
                    <!-- CASE 2: only #id given -->
                    <xsl:otherwise>
                      <!-- manuscript prefix from ID -->
                      <xsl:variable name="id" select="$elementId"/>
                      <xsl:variable name="prefix">
                        <xsl:choose>
                          <xsl:when test="starts-with($id,'frankfurt-ub-b-50')">frankfurt-ub-b-50</xsl:when>
                          <xsl:when test="starts-with($id,'koeln-edd-c-')">koeln-edd-c-119</xsl:when>
                          <xsl:when test="starts-with($id,'vatican-bav-pal-lat-586')">vatican-bav-pal-lat-586</xsl:when>
                          <xsl:otherwise>bamberg-sb-c-6</xsl:otherwise>
                        </xsl:choose>
                      </xsl:variable>
              
                      <!-- extract book number from ID -->
                      <xsl:variable name="booknum" select="replace($id, '.*-(\d+)-.*', '$1')"/>
                      <xsl:variable name="documentPath" select="concat('../mss/', $prefix, '/', $prefix, '-', $booknum, '.xml')"/>
                      <xsl:variable name="doc" select="doc($documentPath)"/>
                      <xsl:variable name="root" select="$doc"/>
                      <xsl:value-of select="$root//tei:msName[@type = 'sigle']"/>,
                      Kap. <xsl:value-of select="($root//*[@xml:id = $elementId]//tei:num)[1]"/> (N.
                      <xsl:value-of select="$root//*[@xml:id = $elementId]/@n"/>)
                    </xsl:otherwise>
                  </xsl:choose>
             
                  <!-- separator -->
                  <xsl:if test="position() &lt; last()"> / </xsl:if>
                </xsl:for-each>
              </td>

            <td>
                <xsl:for-each select="$words-head">
                    <xsl:if test="position() != 1">
                        <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </xsl:for-each>
            </td>
            <td>
                <xsl:for-each select="$words-inscription">
                    <xsl:if test="position() != 1">
                        <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </xsl:for-each>
            </td>
            <td><!-- Output the first three words --> <xsl:for-each select="$words-incipit[position() le 3]"> <xsl:if test="position() != 1">
                <xsl:text> </xsl:text> </xsl:if> <xsl:value-of select="."/> </xsl:for-each>...</td>

            <!--HERE - ToDo: solve the issue of two values in @hand-->

            <td>
                <!-- Step 1: Get all hand IDs as strings -->
                <xsl:variable name="handIds" select="tokenize(@hand, '\s+')"/>

                <!-- Step 2: Select the corresponding <tei:handNote> elements directly -->
                <xsl:for-each select="                         for $id in $handIds                         return                             key('handNotesById', substring-after($id, '#'))">

                    <!-- Display hand note content -->
                    <xsl:apply-templates select="node() except tei:note"/>
                    <xsl:text> </xsl:text>

                    <!-- Get scribe -->
                    <xsl:if test="@scribeRef">
                        <xsl:variable name="scribeId" select="substring-after(@scribeRef, '#')"/>
                        <xsl:variable name="scribe" select="key('personById', $scribeId, $scribesDoc)"/>
                        <xsl:if test="$scribe">
                            <xsl:value-of select="$scribe/tei:name"/>
                            <xsl:text>, </xsl:text>
                            <xsl:value-of select="$scribe/tei:affiliation"/>
                            <xsl:text> </xsl:text>
                        </xsl:if>
                    </xsl:if>

                </xsl:for-each>
            </td>
        </tr>

        <!-- Process child <div type="interrogation"> elements -->
        <xsl:for-each select="tei:div[@type = 'interrogation']">
            <!--<xsl:variable name="interrogationLabel"> Int. <xsl:value-of select="./tei:label//tei:num"/> (<xsl:value-of select="./tei:label//tei:num/@value"/>) </xsl:variable>-->
            <xsl:variable name="interrogationLabel">
                <xsl:text>Int. </xsl:text>
                
                <span class="structure-clickable-number">
                    <xsl:apply-templates select="./tei:label//tei:num" mode="transcription"/>
                </span>
                
                <xsl:text> (</xsl:text>
                <xsl:value-of select="./tei:label//tei:num/@value"/>
                <xsl:text>)</xsl:text>
            </xsl:variable>

            <xsl:variable name="interrogation-text-incipit">
                <xsl:apply-templates select="./tei:p[not(self::tei:label) and not(self::tei:pc)]" mode="structure"/>
            </xsl:variable>
            <!-- Normalize space and split the string into words -->
            <xsl:variable name="interrogationIncipit" select="tokenize(normalize-space($interrogation-text-incipit), '\s+')"/>

            <xsl:variable name="interrogation-text-head">
                <xsl:apply-templates select="./tei:label[not(self::tei:pc)]" mode="structure"/>
            </xsl:variable>
            <!-- Normalize space and split the string into words -->
            <xsl:variable name="interrogationHead" select="tokenize(normalize-space($interrogation-text-head), '\s+')"/>

            <tr>
                <td>
                    <!--<xsl:value-of select="$interrogationLabel"/>-->
                    <a href="#{@xml:id}" data-chapter-id="{@xml:id}" onclick="linkStructureToChapter(this); return false;">
                        <xsl:sequence select="$interrogationLabel"/>
                    </a>
                </td>
                <td>
                    <xsl:value-of select="./@n"/>
                </td>
                <td>
                    <!-- TODO transmission interrogations -->
                </td>
                <td>
                    <!-- rubric -->
                    <xsl:for-each select="$interrogationHead">
                        <xsl:if test="position() != 1">
                            <xsl:text> </xsl:text>
                        </xsl:if>
                        <xsl:value-of select="."/>
                    </xsl:for-each>
                </td>
                <td><!-- inscription NO  --></td>
                <td><!-- incipit  --> <xsl:for-each select="$interrogationIncipit[position() le 3]">
                    <xsl:if test="position() != 1"> <xsl:text> </xsl:text> </xsl:if> <xsl:value-of select="."/> </xsl:for-each>... </td>
                <td>
                    <!-- Step 1: Get all hand IDs as strings -->
                    <xsl:variable name="handIds" select="tokenize(@hand, '\s+')"/>

                    <!-- Step 2: Select the corresponding <tei:handNote> elements directly -->
                    <xsl:for-each select="for $id in $handIds return key('handNotesById', substring-after($id, '#'))">

                        <!-- Display hand note content -->
                        <xsl:apply-templates select="node() except tei:note"/>
                        <xsl:text> </xsl:text>

                        <!-- Get scribe -->
                        <xsl:if test="@scribeRef">
                            <xsl:variable name="scribeId" select="substring-after(@scribeRef, '#')"/>
                            <xsl:variable name="scribe" select="key('personById', $scribeId, $scribesDoc)"/>
                            <xsl:if test="$scribe">
                                <xsl:value-of select="$scribe/tei:name"/>
                                <xsl:text>, </xsl:text>
                                <xsl:value-of select="$scribe/tei:affiliation"/>
                                <xsl:text> </xsl:text>
                            </xsl:if>
                        </xsl:if>

                    </xsl:for-each>
                </td>
            </tr>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="tei:div[@type = 'praefatiuncula']" mode="structure"/>

    <xsl:template match="tei:head/tei:label" mode="structure"/>

    <xsl:template match="tei:seg" mode="structure"/>

    <xsl:template match="tei:choice" mode="structure">
        <xsl:text> </xsl:text>
        <!-- Add space before choice content -->
        <xsl:apply-templates mode="structure"/>
        <xsl:text> </xsl:text>
        <!-- Add space after choice content -->
    </xsl:template>

    <xsl:template match="tei:teiHeader" mode="structure">
        <xsl:apply-templates select="tei:fileDesc/tei:sourceDesc/tei:msDesc/tei:physDesc/tei:handDesc"/>
    </xsl:template>

<!-- SCRIBE (mode=scribe) -->
<!-- Load scribes + literature for scribe/source lookup -->
<!-- Root: provide source content for the two Scribe UI sections -->
    <xsl:template match="/" mode="scribe">
        <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>
        <xsl:variable name="book-n" select="//tei:div[@type='book']/@n"/>
        <xsl:variable name="root" select="/"/>

        <xsl:variable name="usedHandIds" as="xs:string*" select="distinct-values(for $ref in (//@hand, //tei:handShift/@new)                 return                     for $token in tokenize(normalize-space(string($ref)), '\s+')                     return substring-after($token, '#'))"/>

        <div class="tei-scribe-source" data-ms-id="{$ms-id}" data-book-n="{$book-n}">
            <div class="tei-scribe-section-source" data-scribe-section="info">
                <xsl:for-each select="$usedHandIds[. != '']">
                    <xsl:variable name="handId" select="."/>
                    <xsl:apply-templates select="key('handNotesById', $handId, $root)" mode="scribe"/>
                </xsl:for-each>
            </div>

            <div class="tei-scribe-section-source" data-scribe-section="hands">
            <table class="table table-hover">
                <tbody>
                    <xsl:for-each select="//tei:handDesc/tei:handNote">
                        <tr>
                            <!-- Hand -->
                            <td>
                                <xsl:apply-templates select="node() except tei:note"/>
                            </td>

                            <!-- Scribe -->
                            <td>
                                <xsl:variable name="scribeId" select="substring-after(@scribeRef, '#')"/>
                                <xsl:variable name="scribe" select="key('personById', $scribeId, $scribesDoc)"/>

                                <xsl:if test="$scribe">
                                    <xsl:value-of select="concat($scribe/tei:name, ', ', $scribe/tei:affiliation)"/>
                                </xsl:if>
                            </td>

                            <!-- Source -->
                            <td>
                                <xsl:variable name="sourceId" select="substring-before(substring-after(@source, '#'), '|')"/>
                                <xsl:variable name="pageNumber" select="substring-after(@source, '|')"/>
                                <xsl:variable name="bibl" select="key('biblById', $sourceId, $literatureDoc)"/>

                                <xsl:if test="$bibl">
                                    <xsl:value-of select="$bibl/tei:monogr/tei:title"/>
                                    <xsl:text>, </xsl:text>

                                    <xsl:for-each select="$bibl/tei:monogr/tei:author">
                                        <xsl:value-of select="concat(tei:forename, ' ', tei:surname)"/>

                                        <xsl:if test="position() != last()">
                                            <xsl:text>; </xsl:text>
                                        </xsl:if>
                                    </xsl:for-each>

                                    <xsl:text>, </xsl:text>
                                    <xsl:value-of select="$bibl/tei:monogr/tei:imprint/tei:pubPlace"/>
                                    <xsl:text>, </xsl:text>
                                    <xsl:value-of select="$bibl/tei:monogr/tei:imprint/tei:date"/>

                                    <xsl:if test="$bibl/tei:series">
                                        <xsl:text>, </xsl:text>
                                        <xsl:value-of select="$bibl/tei:series/tei:title"/>
                                        <xsl:text>, </xsl:text>
                                        <xsl:value-of select="$bibl/tei:series/tei:biblScope[@unit='volume']"/>
                                    </xsl:if>

                                    <xsl:text>, Page: </xsl:text>
                                    <xsl:value-of select="$pageNumber"/>
                                    <xsl:text> </xsl:text>

                                    <a href="{concat('bibl.html#', $sourceId)}" target="_blank">
                                        <i class="fas fa-arrow-up-right-from-square fa-sm"/>
                                    </a>
                                </xsl:if>
                            </td>
                        </tr>
                    </xsl:for-each>
                </tbody>
            </table>
        </div>
        </div>
</xsl:template>

    <!-- handNote template for the Scribe Info accordion -->
    <xsl:template match="tei:handNote" mode="scribe">
        <xsl:variable name="scribeNumber" select="substring-after(@scribeRef, 'WoSscribe')"/>
        <xsl:choose>
            <xsl:when test="contains(@scribeRef, 'WoSscribe')">
                <p class="scribe{$scribeNumber}-info">
                    <xsl:value-of select="normalize-space(./text())"/>
                    <xsl:text> </xsl:text>
                    <span lang="de">Schreiber</span>
                    <xsl:text> </xsl:text>
                    <span lang="en">Scribe</span>
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="$scribeNumber"/>
                    <xsl:text>, Wormser Scriptorium</xsl:text>
                </p>
            </xsl:when>
            <xsl:when test="contains(@scribeRef, 'WoSunidentified')">
                <p class="scribe-unidentified-info">
                    <span lang="de">Nicht identifizierte Hand.</span>
                    <xsl:text> </xsl:text>
                    <span lang="en">Not identified hand.</span>
                </p>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

<!-- INFO (mode=info) -->
<xsl:template match="/" mode="info">
    <div class="tei-info-source">
        <xsl:apply-templates select="//tei:publicationStmt" mode="info"/>
        <xsl:apply-templates select="//tei:respStmt" mode="info"/>
    </div>
</xsl:template>

<!-- Exclude elements you do not want -->
<xsl:template match="tei:title" mode="info"/>
<xsl:template match="tei:funder" mode="info"/>
<xsl:template match="tei:principal" mode="info"/>

<!-- Date of publication -->
    <!-- Publication data used by the JavaScript editor UI -->
<xsl:template match="tei:publicationStmt" mode="info">
    <div class="tei-info-publication-source">
        <xsl:for-each select="tei:date[@xml:lang='en']"><span lang="en" data-publication-date="{format-date(xs:date(@when), '[D01].[M01].[Y0001]')}"/></xsl:for-each>
        <xsl:for-each select="tei:date[@xml:lang='ger']"><span lang="de" data-publication-date="{format-date(xs:date(@when), '[D01].[M01].[Y0001]')}"/></xsl:for-each>
    </div>
</xsl:template>

    <!-- Editor data and responsibilities used by the JavaScript editor UI -->
<xsl:template match="tei:respStmt" mode="info">
    <div class="tei-info-editor-source">
        <div class="tei-info-editor-person">
            <xsl:choose>
                <xsl:when test="@ref"><a href="{@ref}" target="_blank" rel="noopener noreferrer" class="tei-info-editor-link"><xsl:value-of select="tei:persName/tei:forename"/><xsl:text> </xsl:text><xsl:value-of select="tei:persName/tei:surname"/></a></xsl:when>
                <xsl:otherwise><span class="tei-info-editor-name"><xsl:value-of select="tei:persName/tei:forename"/><xsl:text> </xsl:text><xsl:value-of select="tei:persName/tei:surname"/></span></xsl:otherwise>
            </xsl:choose>
            <span class="tei-info-editor-affiliation"><xsl:value-of select="tei:persName/tei:affiliation"/></span>
        </div>

        <div class="tei-info-responsibilities-source">
            <xsl:apply-templates select="tei:resp" mode="info"/>
        </div>
    </div>
</xsl:template>



    <!-- Responsibility data used by the JavaScript editor UI -->
<xsl:template match="tei:resp" mode="info">
    <div class="tei-info-responsibility-source"><xsl:apply-templates select="tei:span" mode="info"/></div>
</xsl:template>

<!-- Language spans -->
<xsl:template match="tei:span" mode="info">
  <span lang="{@xml:lang}">
    <xsl:value-of select="."/>
  </span>
</xsl:template>
    
</xsl:stylesheet>