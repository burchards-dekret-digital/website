<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" version="2.0" exclude-result-prefixes="tei">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="/tei:TEI">
    <xsl:apply-templates select="tei:text/tei:body"/>
  </xsl:template>

  <xsl:template match="tei:body">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="tei:div[@xml:id]">
    <div id="{@xml:id}">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <!-- TEI div with @rend = layout wrapper -->
  <xsl:template match="tei:div[@rend]">
    <div class="{@rend}">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <!-- Language blocks -->
  <xsl:template match="tei:div[@xml:lang]">
    <span lang="{@xml:lang}">
      <xsl:apply-templates/>
    </span>
  </xsl:template>



  <xsl:template match="tei:p">
    <p><xsl:apply-templates/></p>
  </xsl:template>

  <xsl:template match="tei:hi[@rend='bold']">
    <b><xsl:apply-templates/></b>
  </xsl:template>

  <xsl:template match="tei:hi[@rend='italic']">
    <i><xsl:apply-templates/></i>
  </xsl:template>


  <xsl:template match="tei:ref">
    <a href="{@target}">
      <xsl:if test="@rend">
        <xsl:attribute name="class"><xsl:value-of select="@rend"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </a>
  </xsl:template>

 
  <xsl:template match="tei:list[@type='bulleted']">
    <ul>
      <xsl:if test="@rend">
        <xsl:attribute name="class"><xsl:value-of select="@rend"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates select="tei:item"/>
    </ul>
  </xsl:template>

  <xsl:template match="tei:item">
    <li><xsl:apply-templates/></li>
  </xsl:template>

 
  <xsl:template match="tei:figure">
    <figure class="my-3 text-center">
      
      <xsl:apply-templates select="tei:graphic"/>

      <xsl:if test="tei:figDesc">
        <figcaption class="small text-muted mt-2">
          <xsl:apply-templates select="tei:figDesc/node()"/>
        </figcaption>
      </xsl:if>
    </figure>
  </xsl:template>

  <xsl:template match="tei:graphic">
    <img src="{@url}" class="img-fluid rounded border" loading="lazy" width="70%">
      <xsl:attribute name="alt">
        <xsl:value-of select="normalize-space(../tei:figDesc)"/>
      </xsl:attribute>
    </img>
  </xsl:template>

  <xsl:template match="text()">
    <xsl:value-of select="."/>
  </xsl:template>

</xsl:stylesheet>