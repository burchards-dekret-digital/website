<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="2.0">
    <xsl:output method="html" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>
    <!-- Strip spaces from all elements -->
    <xsl:strip-space elements="*"/>
   
    <xsl:template match="/">
        <div id="teiEditor" class="editor">
           <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <!-- Only process child elements of 'titleStmt' from 'TEI' -->
    
    <xsl:template match="tei:TEI">
        <xsl:apply-templates select="tei:teiHeader/tei:fileDesc/tei:titleStmt/*"/>
    </xsl:template>

    <!--Exclude titles-->
    <xsl:template match="tei:title"/>
    <!--Exclude funder-->
    <xsl:template match="tei:funder"/>
    <!--Exclude Principal-->
    <xsl:template match="tei:principal"/>

    <!--<xsl:template match="/">
        <ul>
            <xsl:apply-templates select="//tei:respStmt"/>
        </ul>
    </xsl:template>-->
   
    <!--<xsl:key name="handNotesById" match="tei:handNote" use="@xml:id"/>
    
    <xsl:key name="allHandRefs" match="*[@hand] | tei:handShift[@new]" use="(@hand | @new)"/>-->

    <xsl:template match="/">
    <div class="accordion accordion-flush" id="accordionInfo">
        <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>
        <xsl:variable name="book-n" select="//tei:div[@type='book']/@n"/>
        <xsl:variable name="sigle" select="//tei:msName[@type='sigle']"/>
        
        <!--<div class="accordion-item">
            <h2 class="accordion-header" id="headingScribe">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseScribe-{$ms-id}-{$book-n}" aria-expanded="false" aria-controls="collapseScribe-{$ms-id}-{$book-n}">
                    <span lang="de">Schreiber</span><span lang="en">Scribe</span>
                </button>
            </h2>
            <div id="collapseScribe-{$ms-id}-{$book-n}" class="accordion-collapse collapse" aria-labelledby="headingScribe">
                <div class="accordion-body">
                        <xsl:for-each select="(//*[@hand] | //tei:handShift[@new])                                                 [generate-id() = generate-id(key('allHandRefs', (@hand | @new))[1])]">
                            <xsl:variable name="handId" select="substring-after((@hand | @new)[1], '#')"/>
                            <xsl:apply-templates select="key('handNotesById', $handId)"/>
                        </xsl:for-each>
                    
                </div>
            </div>
        </div>-->

        <!-- Editor Info -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingEditor">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEditor-{$ms-id}-{$book-n}" aria-expanded="false" aria-controls="collapseEditor-{$ms-id}-{$book-n}">
                    Editor
                </button>
            </h2>
            <div id="collapseEditor-{$ms-id}-{$book-n}" class="accordion-collapse collapse" aria-labelledby="headingEditor">
                <div class="accordion-body">
                        <xsl:apply-templates select="//tei:respStmt"/>
                </div>
            </div>
        </div>
    </div>
</xsl:template>
    
    
       <!--<xsl:template match="tei:handNote">
    <xsl:variable name="scribeNumber" select="substring-after(@scribeRef, 'WoSscribe')"/>
    
    <xsl:choose>
        <xsl:when test="contains(@scribeRef, 'WoSscribe')">
            <p class="scribe{$scribeNumber}-info">
                <xsl:value-of select="normalize-space(./text())"/>
                <xsl:text> </xsl:text>
                <xsl:element name="span">
                    <xsl:attribute name="lang">de</xsl:attribute>
                    <xsl:value-of select="'Schreiber'"/>
                </xsl:element>
                <xsl:text> </xsl:text>
                <xsl:element name="span">
                    <xsl:attribute name="lang">en</xsl:attribute>
                    <xsl:value-of select="'Scribe'"/>
                </xsl:element>
                <xsl:text> </xsl:text>
                <xsl:value-of select="$scribeNumber"/>
                <xsl:text>, </xsl:text>
                <xsl:text>Wormser Scriptorium</xsl:text>
            </p>
        </xsl:when>
        
        <xsl:when test="contains(@scribeRef, 'WoSunidentified')">
            <p class="scribe-unidentified-info">
                <xsl:element name="span">
                    <xsl:attribute name="lang">de</xsl:attribute>
                    <xsl:value-of select="'Nicht identifizierte Hand.'"/>
                </xsl:element>
                <xsl:text> </xsl:text>
                <xsl:element name="span">
                    <xsl:attribute name="lang">en</xsl:attribute>
                    <xsl:value-of select="'Not identified hand.'"/>
                </xsl:element>
            </p>
        </xsl:when>
    </xsl:choose>
</xsl:template>-->





    <xsl:template match="tei:respStmt">
            <strong>
                <xsl:value-of select="tei:persName/tei:forename"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="tei:persName/tei:surname"/>
            </strong>    
            <xsl:text>, </xsl:text>
            <xsl:value-of select="tei:persName/tei:affiliation"/>
            <xsl:text>:</xsl:text>
            <ul>
                <xsl:apply-templates select="tei:resp"/>
            </ul>
    </xsl:template>

    
    
    <xsl:template match="tei:resp">
        <li>
            <xsl:apply-templates select="tei:span"/>
        </li>
</xsl:template>

<xsl:template match="tei:span">
    <span lang="{@xml:lang}">
        <xsl:value-of select="."/>
    </span>
</xsl:template>
    
<!-- Check if this is the last or second-to-last 'resp' element -->
<!-- If this is the second-to-last 'resp' element, use a period -->
<!-- If this is the last 'resp' element, use a period -->
<!-- Otherwise, use a semicolon -->
<!--<xsl:template match="tei:resp">
    <li lang="{@xml:lang}">
        <xsl:value-of select="."/>
        
        <xsl:choose>
            <xsl:when test="position() = last()-1">
                <xsl:text/>
            </xsl:when>
            <xsl:when test="position() = last()">
                <xsl:text/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>;</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </li>
</xsl:template>-->  
</xsl:stylesheet>