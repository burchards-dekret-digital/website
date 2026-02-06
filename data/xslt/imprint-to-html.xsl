<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs tei" version="2.0">
    <xsl:output method="html" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>
   
    <!-- Strip spaces from all elements -->
    <xsl:strip-space elements="*"/>
    
    <!-- Only process child elements of 'body' from 'TEI' -->
    <xsl:template match="tei:TEI">
        <xsl:apply-templates select="tei:text/tei:body/*"/>
    </xsl:template>
    
    <!-- Do nothing for 'teiHeader', effectively excluding it from output -->
    <xsl:template match="tei:teiHeader"/>
    
    
    <xsl:template match="tei:div[@xml:id]">
        <div id="{@xml:id}" class="block">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
       

    <!-- Handle language 
    <xsl:template match="tei:div[@xml:lang]">
        <xsl:for-each select=".">
            <span lang="{@xml:lang}">
                <xsl:apply-templates/>
            </span>
        </xsl:for-each>
    </xsl:template>-->
    
    <xsl:template match="tei:head[@type='title']">
        <h1 class="mt-5">
            <xsl:apply-templates/>
        </h1>
    </xsl:template>
    
    <xsl:template match="tei:head">
        <h3 class="mt-4">
            <xsl:apply-templates/>
        </h3>
    </xsl:template>
    
    <!-- Handle p -->
    <xsl:template match="tei:p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    
    
    <!--hi rend="bold" and italic -->
    <xsl:template match="//tei:hi[@rend='bold']">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    
    <xsl:template match="//tei:hi[@rend='italic']">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>
    

    
    
  <xsl:template match="//tei:div[@xml:id='citation_de']">
    <p>
      <b>
        <xsl:value-of select="//tei:p[@xml:id='howToCite_de']"/>
      </b>
      <br/>
      <div class="code-box-container" style="position: relative; margin: 1em 0;">
        <pre style="background: #f5f5f5; padding: 1em; border-radius: 5px; overflow: auto; max-height: 50px;">
          <code id="citationBox_de">
                <xsl:apply-templates select="//tei:p[@xml:id='citationBox_de']"/>
          </code>
        </pre>
        <button class="btn btn-outline-secondary btn-sm" style="position: absolute; top: 10px; right: 30px;">
          <xsl:attribute name="id">
            <xsl:text>copyCitationButton_de</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="onclick">
            <xsl:text>copyCitationCode('citationBox_de', 'copyCitationButton_de')</xsl:text>
          </xsl:attribute>
          Kopieren
        </button>
      </div>
    </p>
  </xsl:template>
    
   
    
    <xsl:template match="//tei:div[@xml:id='citation_en']">
    <p>
      <b>
        <xsl:value-of select="//tei:p[@xml:id='howToCite_en']"/>
      </b>
      <br/>
      <div class="code-box-container" style="position: relative; margin: 1em 0;">
        <pre style="background: #f5f5f5; padding: 1em; border-radius: 5px; overflow: auto; max-height: 50px;">
          <code id="citationBox_en">
            <xsl:apply-templates select="//tei:p[@xml:id='citationBox_en']"/>
          </code>
        </pre>
        <button class="btn btn-outline-secondary btn-sm" style="position: absolute; top: 10px; right: 30px;">
          <xsl:attribute name="id">
            <xsl:text>copyCitationButton_en</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="onclick">
            <xsl:text>copyCitationCode('citationBox_en', 'copyCitationButton_en')</xsl:text>
          </xsl:attribute>
            Copy
        </button>
      </div>
    </p>
  </xsl:template>
    
    
    

<!-- Office blocks: render as Bootstrap cards in a responsive grid column -->
<xsl:template match="tei:div[@type='office']">
  <div class="col-12 col-lg-4">
    <div class="card h-100 ">
      <div class="card-header">
        
          <xsl:apply-templates select="tei:head"/>
        
      </div>
      <div class="card-body">
        <address class="mb-0">
          <xsl:apply-templates select="tei:p"/>
        </address>
      </div>
    </div>
  </div>
</xsl:template>
    
    <!-- Wrap all office cards of a language block in a Bootstrap row -->
<xsl:template match="tei:div[@xml:lang]">
  <span lang="{@xml:lang}">
    <!-- everything BEFORE offices -->
    <xsl:apply-templates select="tei:div[not(@type='office')]"/>

    <!-- offices grid -->
    <div class="row g-3 mt-2">
      <xsl:apply-templates select="tei:div[@type='office']"/>
    </div>
  </span>
</xsl:template>


    
    <!-- Compact lines inside office cards (avoid big <p> spacing) -->
<xsl:template match="tei:div[@type='office']/tei:p">
  <div class="{if (position() = last()) then 'mb-0' else 'mb-1'}">
    <xsl:apply-templates/>
  </div>
</xsl:template>
    
    <xsl:template match="tei:email">
  <a href="mailto:{normalize-space(.)}">
    <xsl:value-of select="normalize-space(.)"/>
  </a>
</xsl:template>
    
    <xsl:template match="tei:ref">
  <a href="{@target}" class="text-break">
    <xsl:apply-templates/>
  </a>
</xsl:template>

<!-- Handle TEI lists as HTML bullet lists -->
<xsl:template match="tei:list">
  <ul class="ms-3">
    <xsl:apply-templates/>
  </ul>
</xsl:template>
    
    <xsl:template match="tei:item">
  <li>
    <xsl:apply-templates/>
  </li>
</xsl:template>

</xsl:stylesheet>