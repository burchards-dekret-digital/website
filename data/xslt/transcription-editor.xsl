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

    <xsl:template match="/">
        <ul>
            <xsl:apply-templates select="//tei:respStmt"/>
        </ul>
    </xsl:template>

    <xsl:template match="tei:respStmt">
        <li>
            <xsl:value-of select="tei:persName/tei:forename"/>
            <xsl:text> </xsl:text>
            <xsl:value-of select="tei:persName/tei:surname"/>
            <xsl:text>, </xsl:text>
            <xsl:value-of select="tei:persName/tei:affiliation"/>
            <ul>
                <xsl:apply-templates select="tei:resp"/>
            </ul>
        </li>
    </xsl:template>

    <xsl:template match="tei:resp">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>

</xsl:stylesheet>